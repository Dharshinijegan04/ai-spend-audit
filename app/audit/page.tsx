"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuditPage() {

  const router = useRouter();

  // STATES
  const [tool, setTool] = useState("ChatGPT");

  const [plan, setPlan] = useState("Plus");

  const [spend, setSpend] = useState("");

  const [seats, setSeats] = useState("");

  const [teamSize, setTeamSize] = useState("");

  const [useCase, setUseCase] = useState("Coding");

  const [loading, setLoading] = useState(false);

  // TOOL PLANS
  const plans: Record<string, string[]> = {

    ChatGPT: [
      "Plus",
      "Team",
      "Enterprise",
    ],

    Claude: [
      "Pro",
      "Max",
      "Team",
      "Enterprise",
    ],

    Cursor: [
      "Pro",
      "Business",
      "Enterprise",
    ],

    "GitHub Copilot": [
      "Individual",
      "Business",
      "Enterprise",
    ],

    Gemini: [
      "Pro",
      "Ultra",
      "Enterprise",
    ],
  };

  // HANDLE SUBMIT
  const handleAudit = async () => {

    // VALIDATION
    if (
      !spend ||
      !seats ||
      !teamSize
    ) {

      alert("Please fill all fields.");

      return;
    }

    try {

      setLoading(true);

      // SAVE DATA
      localStorage.setItem("tool", tool);

      localStorage.setItem("plan", plan);

      localStorage.setItem("spend", spend);

      localStorage.setItem("seats", seats);

      localStorage.setItem("teamSize", teamSize);

      localStorage.setItem("useCase", useCase);

      // REDIRECT
      router.push("/result");

    } catch (error) {

      console.log(error);

      alert("Something went wrong.");

    } finally {

      setLoading(false);
    }
  };

  return (

    <main className="min-h-screen bg-black text-white px-6 py-12">

      {/* HEADER */}
      <div className="text-center">

        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-400 text-sm mb-8">

          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

          AI Cost Optimization Platform

        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">

          AI Spend Audit

        </h1>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-8">

          Analyze your startup's AI spending and discover
          hidden savings opportunities across ChatGPT,
          Claude, Cursor, Copilot, Gemini, and more.

        </p>

      </div>

      {/* FORM CARD */}
      <div className="max-w-3xl mx-auto mt-14 bg-gray-900 border border-gray-800 rounded-3xl p-8 md:p-10">

        <div className="grid md:grid-cols-2 gap-6">

          {/* TOOL */}
          <div>

            <label className="block mb-3 text-lg font-medium">
              AI Tool
            </label>

            <select
              value={tool}
              onChange={(e) => {

                const selectedTool = e.target.value;

                setTool(selectedTool);

                setPlan(plans[selectedTool][0]);
              }}
              className="w-full bg-black border border-gray-700 rounded-2xl p-4 focus:outline-none focus:border-green-500"
            >

              <option>ChatGPT</option>

              <option>Claude</option>

              <option>Cursor</option>

              <option>GitHub Copilot</option>

              <option>Gemini</option>

            </select>

          </div>

          {/* PLAN */}
          <div>

            <label className="block mb-3 text-lg font-medium">
              Current Plan
            </label>

            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-2xl p-4 focus:outline-none focus:border-green-500"
            >

              {plans[tool].map((item) => (

                <option key={item}>
                  {item}
                </option>

              ))}

            </select>

          </div>

          {/* MONTHLY SPEND */}
          <div>

            <label className="block mb-3 text-lg font-medium">
              Monthly Spend ($)
            </label>

            <input
              type="number"
              placeholder="250"
              value={spend}
              onChange={(e) => setSpend(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-2xl p-4 focus:outline-none focus:border-green-500"
            />

          </div>

          {/* SEATS */}
          <div>

            <label className="block mb-3 text-lg font-medium">
              Number of Seats
            </label>

            <input
              type="number"
              placeholder="5"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-2xl p-4 focus:outline-none focus:border-green-500"
            />

          </div>

          {/* TEAM SIZE */}
          <div>

            <label className="block mb-3 text-lg font-medium">
              Team Size
            </label>

            <input
              type="number"
              placeholder="10"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-2xl p-4 focus:outline-none focus:border-green-500"
            />

          </div>

          {/* USE CASE */}
          <div>

            <label className="block mb-3 text-lg font-medium">
              Primary Use Case
            </label>

            <select
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-2xl p-4 focus:outline-none focus:border-green-500"
            >

              <option>Coding</option>

              <option>Writing</option>

              <option>Research</option>

              <option>Data Analysis</option>

              <option>Mixed Usage</option>

            </select>

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleAudit}
          disabled={loading}
          className="w-full mt-10 bg-green-500 hover:bg-green-400 transition duration-300 text-black font-bold py-4 rounded-2xl text-lg"
        >

          {loading
            ? "Generating Audit..."
            : "Generate Audit Report"}

        </button>

      </div>

      {/* INFO SECTION */}
      <div className="max-w-5xl mx-auto mt-20 grid md:grid-cols-3 gap-8">

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">

          <div className="text-4xl mb-4">
            💰
          </div>

          <h2 className="text-2xl font-bold mb-4">
            Cost Optimization
          </h2>

          <p className="text-gray-400 leading-8">
            Identify overspending and reduce unnecessary AI subscriptions instantly.
          </p>

        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">

          <div className="text-4xl mb-4">
            📊
          </div>

          <h2 className="text-2xl font-bold mb-4">
            Smart Insights
          </h2>

          <p className="text-gray-400 leading-8">
            Receive intelligent recommendations based on your team size and usage.
          </p>

        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">

          <div className="text-4xl mb-4">
            ⚡
          </div>

          <h2 className="text-2xl font-bold mb-4">
            Instant Reports
          </h2>

          <p className="text-gray-400 leading-8">
            Download professional audit reports with savings visualizations.
          </p>

        </div>

      </div>

    </main>
  );
}