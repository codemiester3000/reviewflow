"use client";

import { useState } from "react";

export default function SendRequestPage() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [method, setMethod] = useState<"sms" | "email">("sms");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [reviewLink, setReviewLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/send-review-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName, customerPhone, customerEmail, method }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setReviewLink(data.reviewLink);
        setCustomerName("");
        setCustomerPhone("");
        setCustomerEmail("");
      } else {
        setError(data.error || "Failed to send request");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Send Review Request</h1>

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200">
          <p className="text-green-800 font-medium">Review request sent!</p>
          {reviewLink && (
            <p className="text-sm text-green-600 mt-1">
              Link: <a href={reviewLink} target="_blank" rel="noopener noreferrer" className="underline">{reviewLink}</a>
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name *
          </label>
          <input
            id="name"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Smith"
          />
        </div>

        {/* Method toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Send via</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMethod("sms")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition border ${
                method === "sms"
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              📱 SMS
            </button>
            <button
              type="button"
              onClick={() => setMethod("email")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition border ${
                method === "email"
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              ✉️ Email
            </button>
          </div>
        </div>

        {method === "sms" ? (
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="customer@email.com"
            />
          </div>
        )}

        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <strong>Preview:</strong> &quot;Hi {customerName || "[Name]"}! Thanks for choosing [Your Business]. We&apos;d love your feedback — it only takes 30 seconds: [link]&quot;
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : `Send via ${method === "sms" ? "SMS" : "Email"}`}
        </button>
      </form>
    </div>
  );
}
