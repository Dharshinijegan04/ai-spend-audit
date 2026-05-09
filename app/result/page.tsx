"use client";

import { useEffect, useState } from "react";

import { generateAudit } from "@/lib/auditEngine";
import { supabase } from "@/lib/supabase";

import jsPDF from "jspdf";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ResultPage() {

  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [spend, setSpend] = useState("");
  const [seats, setSeats] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("");

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setTool(localStorage.getItem("tool") || "");

    setPlan(localStorage.getItem("plan") || "");

    setSpend(localStorage.getItem("spend") || "");

    setSeats(localStorage.getItem("seats") || "");

    setTeamSize(localStorage.getItem("teamSize") || "");

    setUseCase(localStorage.getItem("useCase") || "");

  }, []);

  const currentSpend = Number(spend);

  const audit = generateAudit(
    tool,
    currentSpend,
    Number(seats),
    Number(teamSize)
  );

  const chartData = [
    {
      name: "Current",
      amount: currentSpend,
    },
    {
      name: "Recommended",
      amount: audit.recommendedSpend,
    },
    {
      name: "Savings",
      amount: audit.savings,
    },
  ];

  // SAVE REPORT
  const saveLead = async () => {

    if (!email) {

      alert("Please enter email");

      return false;
    }

    setLoading(true);

    const { error } = await supabase
      .from("leads")
      .insert([
        {
          email,
          company,
          role,
          tool,
          plan,
          savings: audit.yearlySavings,
        },
      ]);

    if (error) {

      console.log(error);

      alert("Failed to save report");

      setLoading(false);

      return false;
    }

    return true;
  };

  // DOWNLOAD PDF
  const downloadPDF = async () => {

    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFontSize(24);

    pdf.text("AI Spend Audit Report", 20, 20);

    pdf.setFontSize(14);

    pdf.text(`AI Tool: ${tool}`, 20, 40);

    pdf.text(`Plan: ${plan}`, 20, 50);

    pdf.text(`Monthly Spend: $${currentSpend}`, 20, 60);

    pdf.text(
      `Recommended Plan: ${audit.recommendedPlan}`,
      20,
      70
    );

    pdf.text(
      `Recommended Spend: $${audit.recommendedSpend}`,
      20,
      80
    );

    pdf.text(
      `Monthly Savings: $${audit.savings}`,
      20,
      90
    );

    pdf.text(
      `Yearly Savings: $${audit.yearlySavings}`,
      20,
      100
    );

    pdf.text("Recommendation:", 20, 120);

    const splitText = pdf.splitTextToSize(
      audit.reason,
      170
    );

    pdf.text(splitText, 20, 130);

    pdf.save("AI-Spend-Audit-Report.pdf");
  };

  // HANDLE DOWNLOAD
const handleDownload = async () => {

  if (!email) {

    alert("Please enter email");

    return;
  }

  setLoading(true);

  // DOWNLOAD PDF FIRST
  await downloadPDF();

  // SAVE TO DATABASE
  await supabase
    .from("leads")
    .insert([
      {
        email,
        company,
        role,
        tool,
        plan,
        savings: audit.yearlySavings,
      },
    ]);

  setLoading(false);

  alert("Report Downloaded!");

  setEmail("");
  setCompany("");
  setRole("");
};

  return (

    <main className="min-h-screen bg-black text-white px-6 py-10">

      {/* HEADER */}
      <h1 className="text-5xl font-bold text-center">
        Your AI Savings Report
      </h1>

      <p className="text-center text-gray-400 mt-4">
        Personalized audit analysis for your AI stack.
      </p>

      {/* REPORT */}
      <div
        className="max-w-4xl mx-auto mt-12 bg-gray-900 p-8 rounded-2xl border border-gray-700"
      >

        <div className="grid md:grid-cols-2 gap-6">

          {/* SUMMARY */}
          <div className="bg-black p-6 rounded-xl border border-gray-700">

            <h2 className="text-2xl font-semibold mb-4">
              Audit Summary
            </h2>

            <div className="space-y-3 text-lg">

              <p>
                AI Tool:
                <span className="text-blue-400 ml-2">
                  {tool}
                </span>
              </p>

              <p>
                Plan:
                <span className="text-cyan-400 ml-2">
                  {plan}
                </span>
              </p>

              <p>
                Seats:
                <span className="text-yellow-400 ml-2">
                  {seats}
                </span>
              </p>

              <p>
                Team Size:
                <span className="text-purple-400 ml-2">
                  {teamSize}
                </span>
              </p>

              <p>
                Use Case:
                <span className="text-pink-400 ml-2">
                  {useCase}
                </span>
              </p>

            </div>

          </div>

          {/* SAVINGS */}
          <div className="bg-black p-6 rounded-xl border border-gray-700">

            <h2 className="text-2xl font-semibold mb-4">
              Savings Breakdown
            </h2>

            <div className="space-y-3 text-lg">

              <p>
                Current Spend:
                <span className="text-red-400 ml-2">
                  ${currentSpend}/month
                </span>
              </p>

              <p>
                Recommended Plan:
                <span className="text-blue-400 ml-2">
                  {audit.recommendedPlan}
                </span>
              </p>

              <p>
                Recommended Spend:
                <span className="text-green-400 ml-2">
                  ${audit.recommendedSpend}/month
                </span>
              </p>

              <p>
                Monthly Savings:
                <span className="text-green-500 ml-2 font-bold">
                  ${audit.savings}
                </span>
              </p>

              <p>
                Yearly Savings:
                <span className="text-green-500 ml-2 font-bold">
                  ${audit.yearlySavings}
                </span>
              </p>

            </div>

          </div>

        </div>

        {/* RECOMMENDATION */}
        <div className="mt-8 bg-black p-6 rounded-xl border border-gray-700">

          <h2 className="text-2xl font-semibold mb-4">
            Recommendation
          </h2>

          <p className="text-gray-300 leading-8 text-lg">
            {audit.reason}
          </p>

        </div>

        {/* CARD */}
        <div className="mt-8 bg-green-500 p-6 rounded-2xl text-black">

          <h2 className="text-3xl font-bold">
            Estimated Annual Savings
          </h2>

          <p className="text-5xl font-extrabold mt-4">
            ${audit.yearlySavings}
          </p>

        </div>

        {/* CHART */}
        <div className="mt-10 bg-black p-6 rounded-2xl border border-gray-700">

          <h2 className="text-2xl font-bold mb-6">
            Savings Visualization
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={chartData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="amount"
                  fill="#22c55e"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* FORM */}
      <div className="max-w-4xl mx-auto mt-10 bg-gray-900 p-8 rounded-2xl border border-gray-700">

        <h2 className="text-3xl font-bold mb-4">
          Get Full Audit Report
        </h2>

        <p className="text-gray-400 mb-8">
          Receive your complete AI optimization report.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {/* EMAIL */}
          <div>

            <label className="block mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="founder@startup.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-gray-700"
            />

          </div>

          {/* COMPANY */}
          <div>

            <label className="block mb-2">
              Company Name
            </label>

            <input
              type="text"
              placeholder="Acme AI"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-gray-700"
            />

          </div>

          {/* ROLE */}
          <div>

            <label className="block mb-2">
              Your Role
            </label>

            <input
              type="text"
              placeholder="Founder"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-gray-700"
            />

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleDownload}
          disabled={loading}
          className="mt-8 w-full bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 rounded-xl"
        >

          {loading
            ? "Generating PDF..."
            : "Download Full Report"}

        </button>

      </div>

    </main>
  );
}