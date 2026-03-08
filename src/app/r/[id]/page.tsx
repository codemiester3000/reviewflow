import { createServerClient } from "@supabase/ssr";
import ReviewGate from "./ReviewGate";

async function getReviewRequest(id: string) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() { return []; },
        setAll() {},
      },
    }
  );

  const { data: request } = await supabase
    .from("review_requests")
    .select("id, business_id, customer_name, status")
    .eq("id", id)
    .single();

  if (!request) return null;

  const { data: business } = await supabase
    .from("businesses")
    .select("name, google_review_url, yelp_review_url, logo_url")
    .eq("id", request.business_id)
    .single();

  // Mark as opened
  if (request.status === "sent" || request.status === "delivered") {
    await supabase
      .from("review_requests")
      .update({ status: "opened", opened_at: new Date().toISOString() })
      .eq("id", id);
  }

  return { request, business };
}

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getReviewRequest(id);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Link not found</h1>
          <p className="mt-2 text-gray-600">This review link may have expired.</p>
        </div>
      </div>
    );
  }

  if (data.request.status === "reviewed" || data.request.status === "feedback") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">🙏</div>
          <h1 className="text-2xl font-bold text-gray-900">Thank you!</h1>
          <p className="mt-2 text-gray-600">You&apos;ve already submitted your feedback.</p>
        </div>
      </div>
    );
  }

  return (
    <ReviewGate
      requestId={data.request.id}
      customerName={data.request.customer_name}
      businessName={data.business?.name || "this business"}
      googleReviewUrl={data.business?.google_review_url || null}
      yelpReviewUrl={data.business?.yelp_review_url || null}
    />
  );
}
