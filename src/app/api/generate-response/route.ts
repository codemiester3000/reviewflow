import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reviewText, reviewerName, rating, businessName } = await request.json();

    const prompt = `You are a helpful assistant for a local business called "${businessName}".
Write a professional, warm, and concise response to the following ${rating}-star review from ${reviewerName || "a customer"}:

"${reviewText}"

Guidelines:
- Keep it under 100 words
- Be genuine and specific to what they mentioned
- If positive (4-5 stars): thank them and invite them back
- If negative (1-3 stars): apologize, acknowledge the issue, offer to make it right
- Use a friendly but professional tone
- Do not use excessive exclamation marks
- Sign off with just the business name`;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    });

    const draft = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ draft });
  } catch (error: unknown) {
    console.error("Error generating response:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
