"use client";

import { useState } from "react";

interface ReviewGateProps {
  requestId: string;
  customerName: string;
  businessName: string;
  googleReviewUrl: string | null;
  yelpReviewUrl: string | null;
}

export default function ReviewGate({
  requestId,
  customerName,
  businessName,
  googleReviewUrl,
  yelpReviewUrl,
}: ReviewGateProps) {
  const [step, setStep] = useState<"rate" | "redirect" | "feedback" | "done">("rate");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRating = async (rating: number) => {
    setSelectedRating(rating);

    if (rating >= 4) {
      // Submit rating and redirect to Google
      await fetch("/api/review-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, rating }),
      });
      setStep("redirect");
    } else {
      setStep("feedback");
    }
  };

  const handleFeedbackSubmit = async () => {
    setSubmitting(true);
    await fetch("/api/review-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, rating: selectedRating, feedback }),
    });
    setStep("done");
  };

  const firstName = customerName.split(" ")[0];

  if (step === "redirect") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Glad you had a great experience!
          </h1>
          <p className="text-gray-600 mb-6">
            Would you mind sharing your experience on Google? It really helps us out.
          </p>
          <div className="space-y-3">
            {googleReviewUrl && (
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Leave a Google Review
              </a>
            )}
            {yelpReviewUrl && (
              <a
                href={yelpReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-6 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
              >
                Leave a Yelp Review
              </a>
            )}
            {!googleReviewUrl && !yelpReviewUrl && (
              <p className="text-gray-500">Thank you for your rating!</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === "feedback") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            We&apos;re sorry to hear that
          </h1>
          <p className="text-gray-600 mb-6">
            Your feedback helps us improve. What could we have done better?
          </p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what happened..."
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleFeedbackSubmit}
            disabled={submitting}
            className="mt-4 w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Submit Feedback"}
          </button>
        </div>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">🙏</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h1>
          <p className="text-gray-600">
            We appreciate your honest feedback and will use it to improve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Hi {firstName}!
        </h1>
        <p className="text-gray-600 mb-8">
          How was your experience with <strong>{businessName}</strong>?
        </p>
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="text-5xl transition-transform hover:scale-110 focus:outline-none"
              aria-label={`${star} star${star !== 1 ? "s" : ""}`}
            >
              <span
                className={
                  star <= (hoveredRating || selectedRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-400">Tap a star to rate</p>
      </div>
    </div>
  );
}
