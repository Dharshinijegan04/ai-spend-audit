import Link from "next/link";

export default function Home() {

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />

          <h1 className="text-2xl font-bold tracking-tight">
            AI Spend Audit
          </h1>

        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">

          <a
            href="#features"
            className="hover:text-white transition"
          >
            Features
          </a>

          <a
            href="#benefits"
            className="hover:text-white transition"
          >
            Benefits
          </a>

          <a
            href="#footer"
            className="hover:text-white transition"
          >
            Contact
          </a>

        </div>

      </nav>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32">

        {/* BACKGROUND GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10">

          <div className="inline-flex items-center gap-2 border border-green-500/30 bg-green-500/10 px-4 py-2 rounded-full text-sm text-green-400 mb-8">

            <span className="w-2 h-2 bg-green-500 rounded-full" />

            Trusted by AI-first startups

          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold max-w-5xl leading-tight tracking-tight">

            Stop Overpaying
            <br />
            For AI Tools

          </h1>

          <p className="text-gray-400 mt-8 max-w-3xl text-lg md:text-xl leading-8">

            Discover hidden savings opportunities across
            ChatGPT, Claude, Cursor, Copilot, Gemini,
            and more. Instantly reduce unnecessary AI costs.

          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">

            <Link
              href="/audit"
              className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-gray-300 transition duration-300"
            >
              Start Free Audit
            </Link>

            <a
              href="#features"
              className="border border-gray-700 px-8 py-4 rounded-2xl hover:border-gray-500 transition duration-300"
            >
              Learn More
            </a>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">

            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">

              <h2 className="text-4xl font-bold text-green-400">
                40%
              </h2>

              <p className="text-gray-400 mt-2">
                Average AI cost reduction
              </p>

            </div>

            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">

              <h2 className="text-4xl font-bold text-blue-400">
                5 Min
              </h2>

              <p className="text-gray-400 mt-2">
                Instant audit generation
              </p>

            </div>

            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">

              <h2 className="text-4xl font-bold text-purple-400">
                100+
              </h2>

              <p className="text-gray-400 mt-2">
                Startups analyzed monthly
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-8 pb-28"
      >

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Powerful AI Spend Insights
          </h2>

          <p className="text-gray-400 mt-5 text-lg">
            Everything you need to optimize your AI stack.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-green-500/40 transition duration-300">

            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6 text-2xl">
              💰
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Instant Savings Analysis
            </h3>

            <p className="text-gray-400 leading-8">
              Identify unnecessary AI subscriptions and uncover
              hidden monthly savings opportunities immediately.
            </p>

          </div>

          {/* CARD 2 */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-blue-500/40 transition duration-300">

            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 text-2xl">
              🤖
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Smart Recommendations
            </h3>

            <p className="text-gray-400 leading-8">
              Receive personalized recommendations for better
              plans, tools, and pricing optimization.
            </p>

          </div>

          {/* CARD 3 */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-purple-500/40 transition duration-300">

            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 text-2xl">
              📊
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Team Cost Insights
            </h3>

            <p className="text-gray-400 leading-8">
              Understand spending patterns across teams and avoid
              unnecessary enterprise upgrades.
            </p>

          </div>

        </div>

      </section>

      {/* BENEFITS */}
      <section
        id="benefits"
        className="max-w-6xl mx-auto px-8 pb-32"
      >

        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-gray-800 rounded-3xl p-10 md:p-16">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>

              <h2 className="text-5xl font-bold leading-tight">
                Reduce AI Costs
                <br />
                Without Sacrificing Productivity
              </h2>

              <p className="text-gray-400 mt-8 text-lg leading-8">

                Most startups overspend on AI subscriptions
                because they lack visibility into cheaper
                alternatives and optimized plans.

              </p>

              <Link
                href="/audit"
                className="inline-block mt-10 bg-green-500 text-black px-8 py-4 rounded-2xl font-bold hover:bg-green-400 transition"
              >
                Run Free Audit
              </Link>

            </div>

            <div className="space-y-6">

              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6">

                <h3 className="text-xl font-semibold">
                  ✔ Compare AI plans instantly
                </h3>

              </div>

              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6">

                <h3 className="text-xl font-semibold">
                  ✔ Detect unnecessary enterprise upgrades
                </h3>

              </div>

              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6">

                <h3 className="text-xl font-semibold">
                  ✔ Generate downloadable audit reports
                </h3>

              </div>

              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6">

                <h3 className="text-xl font-semibold">
                  ✔ Personalized optimization suggestions
                </h3>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer
        id="footer"
        className="border-t border-gray-800 py-10 text-center text-gray-500"
      >

        <p>
          © 2026 AI Spend Audit. All rights reserved.
        </p>

        <p className="mt-3 text-sm text-gray-600">
          Built for modern AI-first startups.
        </p>

      </footer>

    </main>
  );
}