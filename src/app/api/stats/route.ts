import { NextResponse } from "next/server";
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
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Get all review requests for this business
    const { data: requests } = await supabase
      .from("review_requests")
      .select("*")
      .eq("business_id", business.id)
      .order("created_at", { ascending: false });

    const allRequests = requests || [];

    const totalSent = allRequests.filter(r => r.status !== "pending" && r.status !== "failed").length;
    const totalReviewed = allRequests.filter(r => r.status === "reviewed").length;
    const totalFeedback = allRequests.filter(r => r.status === "feedback").length;
    const totalResponded = totalReviewed + totalFeedback;
    const responseRate = totalSent > 0 ? Math.round((totalResponded / totalSent) * 100) : 0;

    const ratingsArray = allRequests.filter(r => r.rating).map(r => r.rating as number);
    const avgRating = ratingsArray.length > 0
      ? (ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length).toFixed(1)
      : "N/A";

    // Last 30 days daily breakdown
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentRequests = allRequests.filter(
      r => new Date(r.created_at) >= thirtyDaysAgo
    );

    const dailyData: Record<string, { sent: number; reviewed: number; feedback: number }> = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      dailyData[key] = { sent: 0, reviewed: 0, feedback: 0 };
    }

    recentRequests.forEach(r => {
      const day = r.created_at.split("T")[0];
      if (dailyData[day]) {
        if (r.status !== "pending" && r.status !== "failed") dailyData[day].sent++;
        if (r.status === "reviewed") dailyData[day].reviewed++;
        if (r.status === "feedback") dailyData[day].feedback++;
      }
    });

    const chartData = Object.entries(dailyData)
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      totalSent,
      totalReviewed,
      totalFeedback,
      responseRate,
      avgRating,
      chartData,
      recentRequests: allRequests.slice(0, 20),
    });
  } catch (error: unknown) {
    console.error("Error fetching stats:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
