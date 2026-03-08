import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: business } = await supabase
      .from("businesses")
      .select("*")
      .eq("user_id", user.id)
      .single();

    return NextResponse.json({ business });
  } catch (error: unknown) {
    console.error("Error fetching business:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { data: existing } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (existing) {
      const { data: business, error } = await supabase
        .from("businesses")
        .update({
          name: body.name,
          phone: body.phone,
          email: body.email,
          google_review_url: body.google_review_url,
          yelp_review_url: body.yelp_review_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ business });
    }

    const { data: business, error } = await supabase
      .from("businesses")
      .insert({
        user_id: user.id,
        name: body.name,
        phone: body.phone,
        email: body.email,
        google_review_url: body.google_review_url,
        yelp_review_url: body.yelp_review_url,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ business });
  } catch (error: unknown) {
    console.error("Error saving business:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
