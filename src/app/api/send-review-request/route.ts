import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import twilio from "twilio";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { customerName, customerPhone, customerEmail, method } = await request.json();

    // Get business info
    const { data: business } = await supabase
      .from("businesses")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Create or find customer
    let customerId: string | null = null;
    if (customerPhone || customerEmail) {
      const { data: existingCustomer } = await supabase
        .from("customers")
        .select("id")
        .eq("business_id", business.id)
        .eq(customerPhone ? "phone" : "email", customerPhone || customerEmail)
        .single();

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const { data: newCustomer } = await supabase
          .from("customers")
          .insert({
            business_id: business.id,
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
          })
          .select("id")
          .single();
        customerId = newCustomer?.id || null;
      }
    }

    // Create review request record
    const { data: reviewRequest, error: insertError } = await supabase
      .from("review_requests")
      .insert({
        business_id: business.id,
        customer_id: customerId,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        method: method || "sms",
        status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    const reviewLink = `${process.env.NEXT_PUBLIC_APP_URL}/r/${reviewRequest.id}`;

    if (method === "sms" && customerPhone) {
      // Send SMS via Twilio
      const twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      const message = await twilioClient.messages.create({
        body: `Hi ${customerName}! Thanks for choosing ${business.name}. We'd love your feedback — it only takes 30 seconds: ${reviewLink}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: customerPhone,
      });

      await supabase
        .from("review_requests")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
          twilio_sid: message.sid,
        })
        .eq("id", reviewRequest.id);
    } else {
      // Mark as sent (email would be handled here)
      await supabase
        .from("review_requests")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
        })
        .eq("id", reviewRequest.id);
    }

    return NextResponse.json({ success: true, reviewLink });
  } catch (error: unknown) {
    console.error("Error sending review request:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
