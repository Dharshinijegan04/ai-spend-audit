"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuditPage() {

  const [tool, setTool] = useState("ChatGPT");

  const [plan, setPlan] = useState("Plus");

  const [spend, setSpend] = useState("");

  const [seats, setSeats] = useState("");

  const [teamSize, setTeamSize] = useState("");

  const [useCase, setUseCase] = useState("Coding");

  const plans: Record<string, string[]> = {

    ChatGPT: [
      "Plus",
      "Team",
      "Enterprise"
    ],

    Claude: [
      "Pro",
      "Max",
      "Team",
      "Enterprise"
    ],

    Cursor: [
      "Pro",
      "Business",
      "Enterprise"
    ],

    "GitHub Copilot": [
      "Individual",
      "Business",
      "Enterprise"
    ],

    Gemini: [
      "Pro",
      "Ultra",
      "Enterprise"
    ]
  };

  const handleAudit = () => {

    localStorage.setItem("tool", tool);

    localStorage.setItem("plan", plan);

    localStorage.setItem("spend", spend);

    localStorage.setItem("seats", seats);

    localStorage.setItem("teamSize", teamSize);

    localStorage.setItem("useCase", useCase);
  };

  return (

    <main className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-5xl font-bold text-center">
        AI Spend Audit
      </h1>

      <p className="text-center text-gray-400 mt-4 max-w-2xl mx-auto">
        Analyze your startup AI tool spending and discover potential monthly savings.
      </p>

      <div className="max-w-2xl mx-auto mt-12 bg-gray-900 p-8 rounded-2xl border border-gray-700 space-y-6">

        {/* AI Tool */}
        <div>

          <label className="block mb-2 text-lg">
            AI Tool
          </label>

          <select
            value={tool}
            onChange={(e) => {

              const selectedTool = e.target.value;

              setTool(selectedTool);

              setPlan(plans[selectedTool][0]);

            }}
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          >

            <option>ChatGPT</option>

            <option>Claude</option>

            <option>Cursor</option>

            <option>GitHub Copilot</option>

            <option>Gemini</option>

          </select>

        </div>

        {/* Plan */}
        <div>

          <label className="block mb-2 text-lg">
            Plan
          </label>

          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          >

            {plans[tool].map((item) => (

              <option key={item}>
                {item}
              </option>

            ))}

          </select>

        </div>

        {/* Monthly Spend */}
        <div>

          <label className="block mb-2 text-lg">
            Monthly Spend ($)
          </label>

          <input
            type="number"
            placeholder="100"
            value={spend}
            onChange={(e) => setSpend(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

        </div>

        {/* Seats */}
        <div>

          <label className="block mb-2 text-lg">
            Number of Seats
          </label>

          <input
            type="number"
            placeholder="5"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

        </div>

        {/* Team Size */}
        <div>

          <label className="block mb-2 text-lg">
            Team Size
          </label>

          <input
            type="number"
            placeholder="10"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

        </div>

        {/* Use Case */}
        <div>

          <label className="block mb-2 text-lg">
            Primary Use Case
          </label>

          <select
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          >

            <option>Coding</option>

            <option>Writing</option>

            <option>Research</option>

            <option>Data Analysis</option>

            <option>Mixed</option>

          </select>

        </div>

        {/* Button */}
        <Link
          href="/result"
          onClick={handleAudit}
          className="block w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-300 transition text-center"
        >

          Generate Audit

        </Link>

      </div>

    </main>
  );
}