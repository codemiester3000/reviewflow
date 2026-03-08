import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <span className="text-xl font-bold text-blue-600">ReviewFlow</span>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Get More Google Reviews
            <span className="text-blue-600"> on Autopilot</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Send automated review requests via SMS after every job. Happy customers leave Google reviews.
            Unhappy ones send you private feedback first. Starting at <strong>$29/month</strong>.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/25"
            >
              Start 14-Day Free Trial
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-200 transition"
            >
              See How It Works
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">No credit card required</p>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-gray-50 py-8 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">10x</p>
              <p className="text-sm text-gray-500 mt-1">Cheaper than Birdeye</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">30 sec</p>
              <p className="text-sm text-gray-500 mt-1">To send a request</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">3-5x</p>
              <p className="text-sm text-gray-500 mt-1">More reviews in 60 days</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">$29</p>
              <p className="text-sm text-gray-500 mt-1">Per month. That&apos;s it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Send a Request</h3>
            <p className="text-gray-600">
              After a job, enter your customer&apos;s name and phone number. We send them a friendly SMS asking for feedback.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Smart Routing</h3>
            <p className="text-gray-600">
              Happy customers (4-5 stars) are sent to your Google review page.
              Unhappy ones submit private feedback — keeping bad reviews off Google.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Watch Reviews Grow</h3>
            <p className="text-gray-600">
              Track every request, see who left reviews, and use AI to draft responses.
              Your star rating climbs, and new customers find you.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="bg-gray-50 py-20 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Stop Overpaying for Reviews
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Enterprise tools charge $250-300/month for dozens of features you&apos;ll never use.
            ReviewFlow does the one thing that matters — getting you more 5-star reviews.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Competitor 1 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-400 mb-2">Birdeye</h3>
              <p className="text-4xl font-bold text-gray-300">$299<span className="text-lg font-normal">/mo</span></p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>Review management</li>
                <li>Webchat widget</li>
                <li>Social media tools</li>
                <li>Surveys &amp; insights</li>
                <li className="italic">20+ features you won&apos;t use</li>
              </ul>
            </div>
            {/* Competitor 2 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-400 mb-2">Podium</h3>
              <p className="text-4xl font-bold text-gray-300">$249<span className="text-lg font-normal">/mo</span></p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>Review management</li>
                <li>Messaging platform</li>
                <li>Payment processing</li>
                <li>Annual contract required</li>
                <li className="italic">15+ features you won&apos;t use</li>
              </ul>
            </div>
            {/* ReviewFlow */}
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-600/20 ring-2 ring-blue-600">
              <h3 className="font-semibold text-blue-100 mb-2">ReviewFlow</h3>
              <p className="text-4xl font-bold">$29<span className="text-lg font-normal">/mo</span></p>
              <ul className="mt-4 space-y-2 text-sm text-blue-100">
                <li className="flex items-center gap-2"><span className="text-white font-bold">&#10003;</span> Automated SMS review requests</li>
                <li className="flex items-center gap-2"><span className="text-white font-bold">&#10003;</span> Smart review routing</li>
                <li className="flex items-center gap-2"><span className="text-white font-bold">&#10003;</span> AI review response drafts</li>
                <li className="flex items-center gap-2"><span className="text-white font-bold">&#10003;</span> Dashboard &amp; analytics</li>
                <li className="flex items-center gap-2"><span className="text-white font-bold">&#10003;</span> No contract. Cancel anytime.</li>
              </ul>
              <Link
                href="/signup"
                className="mt-6 block w-full py-3 bg-white text-blue-600 rounded-xl text-center font-semibold hover:bg-blue-50 transition"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "How does the review routing work?",
              a: "When a customer clicks your review link, they first rate their experience on a simple 1-5 star page. If they give 4-5 stars, they're redirected to leave a Google review. If they give 1-3 stars, they're shown a private feedback form instead — so you can address their concerns before they post publicly.",
            },
            {
              q: "What do I need to get started?",
              a: "Just your Google Business Profile review link (found in your Google Business dashboard under 'Get more reviews') and your customers' phone numbers. Setup takes under 5 minutes.",
            },
            {
              q: "How much does SMS cost?",
              a: "SMS costs are included in your $29/month plan for up to 200 messages. That's more than enough for most local businesses. Need more? Our $49/month plan includes 500 messages plus AI-powered review response drafts.",
            },
            {
              q: "Is there a contract?",
              a: "No contracts, ever. Pay monthly, cancel anytime with one click. We keep customers by being useful, not by locking you in.",
            },
            {
              q: "How is this different from just texting customers myself?",
              a: "You could text customers yourself, but you won't. ReviewFlow automates the ask, routes positive feedback to Google (and negative feedback to you privately), tracks everything in a dashboard, and makes it a one-click process. The businesses that get the most reviews are the ones that ask consistently — that's what we automate.",
            },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Your competitors are getting more reviews than you.
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Every day without a review strategy is customers choosing someone else.
            Start your free trial — it takes 5 minutes.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold hover:bg-blue-50 transition shadow-lg"
          >
            Start 14-Day Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-lg font-bold text-white">ReviewFlow</span>
            <p className="text-sm">&copy; {new Date().getFullYear()} ReviewFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
