import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">

        <h1 className="text-2xl font-bold">
          AI Spend Audit
        </h1>

        <div className="space-x-6 hidden md:flex">
          <a href="#" className="hover:text-gray-400">
            Features
          </a>

          <a href="#" className="hover:text-gray-400">
            Pricing
          </a>

          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-6xl font-extrabold max-w-4xl leading-tight">
          Stop Overpaying For AI Tools
        </h1>

        <p className="text-gray-400 mt-8 max-w-2xl text-xl leading-8">
          Discover hidden savings opportunities across ChatGPT, Claude,
          Cursor, Copilot, Gemini, and more.
        </p>

        <Link
          href="/audit"
          className="mt-10 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-gray-300 transition"
        >
          Start Free Audit
        </Link>

      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-8 pb-24 max-w-6xl mx-auto">

        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">

          <h2 className="text-2xl font-bold mb-4">
            Instant Savings Analysis
          </h2>

          <p className="text-gray-400 leading-7">
            Identify unnecessary AI subscriptions and optimize your monthly costs instantly.
          </p>

        </div>

        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">

          <h2 className="text-2xl font-bold mb-4">
            Smart Recommendations
          </h2>

          <p className="text-gray-400 leading-7">
            Get personalized suggestions for cheaper plans and better AI tool combinations.
          </p>

        </div>

        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">

          <h2 className="text-2xl font-bold mb-4">
            Team Cost Insights
          </h2>

          <p className="text-gray-400 leading-7">
            Analyze spending patterns across teams and reduce unnecessary enterprise upgrades.
          </p>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">
        © 2026 AI Spend Audit. All rights reserved.
      </footer>

    </main>
  );
}