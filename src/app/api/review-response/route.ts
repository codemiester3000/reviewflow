import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

function createServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() { return []; },
        setAll() {},
      },
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const { requestId, rating, feedback } = await request.json();

    if (!requestId || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createServiceClient();

    const status = rating >= 4 ? "reviewed" : "feedback";

    const { error } = await supabase
      .from("review_requests")
      .update({
        status,
        rating,
        feedback_text: feedback || null,
        responded_at: new Date().toISOString(),
      })
      .eq("id", requestId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, status });
  } catch (error: unknown) {
    console.error("Error recording response:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
