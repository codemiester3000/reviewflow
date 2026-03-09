import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">ReviewFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-2">
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
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              10x cheaper than Birdeye & Podium
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Turn every job into a
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> 5-star review</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              One text after every job. Happy customers go to Google.
              Unhappy ones come to you first. Your rating climbs. More customers find you.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="group px-8 py-4 bg-blue-600 text-white rounded-2xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5"
              >
                Start free trial
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">No credit card required &middot; Set up in 5 minutes</p>
          </div>

          {/* Phone mockup showing the review flow */}
          <div className="mt-16 max-w-sm mx-auto">
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-300/50 border border-gray-200 p-2">
              <div className="bg-gray-50 rounded-[1.5rem] p-6 space-y-4">
                {/* SMS bubble */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100 max-w-[260px]">
                    <p className="text-sm text-gray-700">Hi Sarah! Thanks for choosing <strong>Mike&apos;s Plumbing</strong>. How was your experience?</p>
                    <p className="text-xs text-blue-600 mt-1.5 font-medium">reviewflow.app/r/k8f2m</p>
                  </div>
                </div>

                {/* Star rating */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                  <p className="text-sm font-medium text-gray-900 mb-3">How was your experience?</p>
                  <div className="flex justify-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`text-3xl ${star <= 5 ? "text-yellow-400" : "text-gray-200"}`}>
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <div className="bg-green-50 rounded-2xl px-4 py-3 border border-green-200">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <p className="text-sm font-medium text-green-800">Redirected to Google Reviews</p>
                  </div>
                  <p className="text-xs text-green-600 mt-1 ml-6">Sarah left a 5-star review!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / trust strip */}
      <section className="py-10 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">Trusted by local businesses across the US</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-gray-300 text-lg font-semibold">
            <span>Plumbers</span>
            <span>&middot;</span>
            <span>Dentists</span>
            <span>&middot;</span>
            <span>Salons</span>
            <span>&middot;</span>
            <span>Restaurants</span>
            <span>&middot;</span>
            <span>HVAC</span>
            <span>&middot;</span>
            <span>Auto Repair</span>
            <span>&middot;</span>
            <span>Contractors</span>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4">The problem</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Your competitor has 94 Google reviews.<br />
            <span className="text-gray-400">You have 23.</span>
          </h2>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            When someone searches &quot;plumber near me,&quot; Google shows the business with more reviews first.
            More reviews = higher ranking = more calls = more revenue. It&apos;s that simple.
          </p>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            The problem isn&apos;t that your customers are unhappy. It&apos;s that you&apos;re not asking consistently.
            You get busy, you forget, and by the time you remember, the customer has moved on.
          </p>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <p className="text-4xl font-bold text-red-600">72%</p>
              <p className="mt-2 text-sm text-red-700">of customers will leave a review if asked</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <p className="text-4xl font-bold text-red-600">less than 10%</p>
              <p className="mt-2 text-sm text-red-700">of businesses ask consistently</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <p className="text-4xl font-bold text-red-600">$200+</p>
              <p className="mt-2 text-sm text-red-700">revenue impact per Google review</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-950 text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold">Three steps. Five minutes to set up.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="relative">
              <div className="text-7xl font-black text-gray-800 absolute -top-4 -left-2">1</div>
              <div className="relative pt-12">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Finish a job, tap send</h3>
                <p className="text-gray-400 leading-relaxed">
                  Enter your customer&apos;s name and phone number. One tap. That&apos;s it. They get a friendly SMS within seconds.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="text-7xl font-black text-gray-800 absolute -top-4 -left-2">2</div>
              <div className="relative pt-12">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v-2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">We route them smartly</h3>
                <p className="text-gray-400 leading-relaxed">
                  Happy? Sent straight to Google to leave a 5-star review.
                  Unhappy? Redirected to a private form so you can fix it before it goes public.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="text-7xl font-black text-gray-800 absolute -top-4 -left-2">3</div>
              <div className="relative pt-12">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Watch your rating climb</h3>
                <p className="text-gray-400 leading-relaxed">
                  Track everything in your dashboard. See reviews roll in. Use AI to draft responses in one click. Rank higher on Google.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">The difference</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What 60 days of ReviewFlow looks like</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Before */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <p className="text-sm font-bold text-red-500 uppercase tracking-wider mb-6">Before</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-400 text-lg">&#9733;&#9733;&#9733;&#9733;<span className="text-gray-200">&#9733;</span></div>
                <span className="text-gray-500 text-sm">3.8 average</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-400">23</span>
                <span className="text-gray-500 text-sm">Google reviews</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-400">1-2</span>
                <span className="text-gray-500 text-sm">new reviews per month</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-400">#7</span>
                <span className="text-gray-500 text-sm">in local search results</span>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl shadow-blue-600/20">
            <p className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-6">After 60 days</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-300 text-lg">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <span className="text-blue-100 text-sm">4.7 average</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">71</span>
                <span className="text-blue-100 text-sm">Google reviews</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">8-12</span>
                <span className="text-blue-100 text-sm">new reviews per month</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">#2</span>
                <span className="text-blue-100 text-sm">in local search results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-20 md:py-28 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stop paying $300/month for features you don&apos;t use
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Birdeye and Podium charge $249-$299/month. You&apos;re paying for webchat, payment processing, social media tools, and 20 other things you never touch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Competitor cards */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 opacity-60">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Birdeye</p>
              <p className="mt-4 text-5xl font-bold text-gray-300">$299<span className="text-lg font-normal">/mo</span></p>
              <div className="mt-6 space-y-3">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-gray-300">&#10003;</span> Review management
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-gray-300">&#10003;</span> Webchat widget
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-gray-300">&#10003;</span> Social media tools
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-gray-300">&#10003;</span> Surveys &amp; insights
                </p>
                <p className="text-sm text-gray-400 italic">+ 20 features you&apos;ll never use</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 opacity-60">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Podium</p>
              <p className="mt-4 text-5xl font-bold text-gray-300">$249<span className="text-lg font-normal">/mo</span></p>
              <div className="mt-6 space-y-3">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-gray-300">&#10003;</span> Review management
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-gray-300">&#10003;</span> Messaging platform
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-gray-300">&#10003;</span> Payment processing
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-red-300">&#10007;</span> Annual contract required
                </p>
                <p className="text-sm text-gray-400 italic">+ 15 features you&apos;ll never use</p>
              </div>
            </div>

            {/* ReviewFlow */}
            <div className="relative bg-white rounded-2xl p-8 border-2 border-blue-600 shadow-xl shadow-blue-600/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                BEST VALUE
              </div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">ReviewFlow</p>
              <p className="mt-4 text-5xl font-bold text-gray-900">$29<span className="text-lg font-normal text-gray-500">/mo</span></p>
              <div className="mt-6 space-y-3">
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">&#10003;</span> Automated SMS review requests
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">&#10003;</span> Smart review routing
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">&#10003;</span> AI response drafts
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">&#10003;</span> Analytics dashboard
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">&#10003;</span> No contract, cancel anytime
                </p>
              </div>
              <Link
                href="/signup"
                className="mt-8 block w-full py-3.5 bg-blue-600 text-white rounded-xl text-center font-semibold hover:bg-blue-700 transition"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            That&apos;s $3,240/year saved vs. Birdeye. Enough to buy a new work truck.
          </p>
        </div>
      </section>

      {/* Testimonial / Quote */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-1 text-yellow-400 text-2xl mb-6">
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed">
            &ldquo;We went from 19 Google reviews to 67 in two months. I just tap send after every job and ReviewFlow handles the rest.&rdquo;
          </blockquote>
          <div className="mt-8">
            <p className="font-semibold text-gray-900">Mike R.</p>
            <p className="text-sm text-gray-500">Owner, Mike&apos;s Plumbing &middot; Denver, CO</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20 md:py-28 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Questions? Answers.</h2>
          </div>
          <div className="space-y-0">
            {[
              {
                q: "How does the smart routing work?",
                a: "Your customer taps a link, rates their experience 1-5 stars. If they give 4-5 stars, they're sent directly to your Google review page. If they give 1-3 stars, they see a private feedback form instead. Bad experiences stay between you and the customer. Good ones go public.",
              },
              {
                q: "What do I need to get started?",
                a: "Your Google Business Profile review link and your customers' phone numbers. That's it. Setup takes under 5 minutes.",
              },
              {
                q: "Is SMS included in the price?",
                a: "Yes. The $29/month plan includes 200 SMS messages per month — more than enough for most local businesses. Need more volume? Contact us.",
              },
              {
                q: "Is there a contract?",
                a: "No. Month-to-month, cancel with one click. If we're not making you more money than we cost, you should cancel.",
              },
              {
                q: "Why not just text customers myself?",
                a: "You could. But you won't do it consistently. ReviewFlow makes it a 5-second habit: enter name, enter number, tap send. The system handles the routing, tracking, and follow-up. Consistency is what separates businesses with 20 reviews from businesses with 200.",
              },
              {
                q: "How is this different from Birdeye or Podium?",
                a: "They charge $250-300/month because they bundle reviews with webchat, payments, social media, and dozens of other features. We do one thing — get you more Google reviews — and we do it for $29. If all you need is reviews, you're paying 10x too much.",
              },
            ].map((faq, i) => (
              <details key={i} className="group border-b border-gray-200">
                <summary className="flex items-center justify-between py-5 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.q}</h3>
                  <span className="text-gray-400 group-open:rotate-45 transition-transform text-2xl leading-none flex-shrink-0">+</span>
                </summary>
                <p className="pb-5 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Every day without reviews is customers choosing your competitor
          </h2>
          <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
            Set up in 5 minutes. See your first new review this week.
          </p>
          <Link
            href="/signup"
            className="mt-10 inline-block px-10 py-4 bg-white text-blue-600 rounded-2xl text-lg font-bold hover:bg-blue-50 transition shadow-xl hover:-translate-y-0.5"
          >
            Start your free trial
          </Link>
          <p className="mt-4 text-sm text-blue-200">14 days free &middot; No credit card &middot; Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span className="font-bold text-white">ReviewFlow</span>
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="/login" className="hover:text-white transition">Sign In</Link>
              <Link href="/signup" className="hover:text-white transition">Start Trial</Link>
              <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} ReviewFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
