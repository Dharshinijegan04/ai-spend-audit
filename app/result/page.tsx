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

  // =========================
  // STATES
  // =========================

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

  const [shareLoading, setShareLoading] =
    useState(false);

  // AI SUMMARY
  const [summary, setSummary] =
    useState("");

  const [summaryLoading, setSummaryLoading] =
    useState(false);

  // =========================
  // LOAD LOCAL STORAGE
  // =========================

  useEffect(() => {

    if (typeof window !== "undefined") {

      setTool(localStorage.getItem("tool") || "");

      setPlan(localStorage.getItem("plan") || "");

      setSpend(localStorage.getItem("spend") || "");

      setSeats(localStorage.getItem("seats") || "");

      setTeamSize(localStorage.getItem("teamSize") || "");

      setUseCase(localStorage.getItem("useCase") || "");
    }

  }, []);

  const currentSpend = Number(spend);

  // =========================
  // GENERATE AUDIT
  // =========================

  const audit = generateAudit(
    tool,
    currentSpend,
    Number(seats),
    Number(teamSize)
  );

  // =========================
  // CHART DATA
  // =========================

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

  // =========================
  // GENERATE AI SUMMARY
  // =========================

  const generateSummary = async () => {

    try {

      setSummaryLoading(true);

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 1500)
      );

      const aiSummary = `
Your organization is currently using ${tool} on the ${plan} plan with a monthly spend of $${currentSpend}.

Based on your current team size of ${teamSize}, the recommended optimization is the ${audit.recommendedPlan} plan.

This adjustment could help reduce unnecessary AI expenses while still supporting collaboration, productivity, and scalability requirements.

Estimated yearly savings are approximately $${audit.yearlySavings}.

Overall, your current AI infrastructure ${
        audit.savings > 0
          ? "has clear cost optimization opportunities that can improve operational efficiency."
          : "already appears to be relatively optimized for your current usage patterns."
      }
`;

      setSummary(aiSummary);

    } catch (error) {

      console.log(error);

      alert(
        "Failed to generate AI summary."
      );

    } finally {

      setSummaryLoading(false);
    }
  };

  // =========================
  // SAVE LEAD
  // =========================

  const saveLead = async () => {

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

      throw new Error("Failed to save lead");
    }
  };

  // =========================
  // SAVE AUDIT
  // =========================

  const saveAudit = async () => {

    const { data, error } = await supabase
      .from("audits")
      .insert([
        {
          tool,
          plan,
          spend: currentSpend,
          seats,
          team_size: teamSize,
          use_case: useCase,

          recommended_plan:
            audit.recommendedPlan,

          recommended_spend:
            audit.recommendedSpend,

          monthly_savings:
            audit.savings,

          yearly_savings:
            audit.yearlySavings,

          reason:
            audit.reason,
        },
      ])
      .select()
      .single();

    if (error) {

      console.log(error);

      return null;
    }

    return data.id;
  };

  // =========================
  // SHARE REPORT
  // =========================

  const handleShare = async () => {

    try {

      setShareLoading(true);

      const id = await saveAudit();

      if (!id) {

        alert(
          "Failed to generate share link."
        );

        return;
      }

      const shareUrl =
        `${window.location.origin}/result/${id}`;

      await navigator.clipboard.writeText(
        shareUrl
      );

      alert("Share link copied!");

    } catch (error) {

      console.log(error);

      alert("Something went wrong.");

    } finally {

      setShareLoading(false);
    }
  };

  // =========================
  // DOWNLOAD PDF
  // =========================

  const downloadPDF = () => {

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );

    pdf.setFontSize(24);

    pdf.text(
      "AI Spend Audit Report",
      20,
      20
    );

    pdf.setFontSize(14);

    pdf.text(
      `AI Tool: ${tool}`,
      20,
      40
    );

    pdf.text(
      `Current Plan: ${plan}`,
      20,
      50
    );

    pdf.text(
      `Monthly Spend: $${currentSpend}`,
      20,
      60
    );

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

    pdf.text(
      "Recommendation:",
      20,
      120
    );

    const splitText =
      pdf.splitTextToSize(
        audit.reason,
        170
      );

    pdf.text(
      splitText,
      20,
      130
    );

    pdf.save(
      "AI-Spend-Audit-Report.pdf"
    );
  };

  // =========================
  // HANDLE DOWNLOAD
  // =========================

  const handleDownload = async () => {

    if (!email) {

      alert(
        "Please enter your email."
      );

      return;
    }

    try {

      setLoading(true);

      await saveLead();

      downloadPDF();

      alert(
        "Report downloaded successfully!"
      );

      setEmail("");

      setCompany("");

      setRole("");

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong."
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <main className="min-h-screen bg-black text-white px-6 py-10">

      {/* HEADER */}
      <div className="text-center">

        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-400 text-sm mb-8">

          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

          AI Optimization Report

        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold">
          Your AI Savings Report
        </h1>

        <p className="text-gray-400 mt-5 text-lg">
          Personalized optimization insights for your AI stack.
        </p>

      </div>

      {/* MAIN CARD */}
      <div className="max-w-5xl mx-auto mt-12 bg-gray-900 border border-gray-700 rounded-3xl p-8">

        <div className="grid md:grid-cols-2 gap-8">

          {/* SUMMARY */}
          <div className="bg-black rounded-3xl p-6 border border-gray-700">

            <h2 className="text-2xl font-bold mb-6">
              Audit Summary
            </h2>

            <div className="space-y-4 text-lg">

              <p>
                Tool:
                <span className="text-blue-400 ml-2">
                  {tool}
                </span>
              </p>

              <p>
                Current Plan:
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
          <div className="bg-black rounded-3xl p-6 border border-gray-700">

            <h2 className="text-2xl font-bold mb-6">
              Savings Breakdown
            </h2>

            <div className="space-y-4 text-lg">

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
        <div className="mt-8 bg-black border border-gray-700 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Recommendation
          </h2>

          <p className="text-gray-300 leading-8 text-lg">
            {audit.reason}
          </p>

        </div>

        {/* AI SUMMARY BUTTON */}
        <div className="mt-8">

          <button
            onClick={generateSummary}
            className="bg-blue-500 hover:bg-blue-400 transition px-6 py-4 rounded-2xl font-bold w-full"
          >

            {summaryLoading
              ? "Generating..."
              : "Generate AI Summary"}

          </button>

        </div>

        {/* AI SUMMARY CARD */}
        {summary && (

          <div className="mt-8 bg-black border border-gray-700 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              AI Generated Summary
            </h2>

            <p className="text-gray-300 leading-8 text-lg whitespace-pre-line">
              {summary}
            </p>

          </div>
        )}

        {/* HERO */}

<div className="mt-8 bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded-3xl p-8">

  {audit.savings > 0 ? (

    <>
      <h2 className="text-3xl font-bold">
        Estimated Annual Savings
      </h2>

      <p className="text-6xl font-extrabold mt-4">
        ${audit.yearlySavings}
      </p>

      <p className="mt-4 text-lg">
        Your organization may be overpaying for AI tooling.
      </p>
    </>

  ) : (

    <>
      <h2 className="text-3xl font-bold">
        Estimated Annual Savings
      </h2>

      <p className="text-xl mt-4 leading-8">
        No major savings opportunities were identified
        for your current usage patterns.
      </p>

      <p className="mt-4 text-lg">
        Your current AI stack appears cost-efficient
        based on your reported spend and team size.
      </p>
    </>

  )}

</div>

        {/* CHART */}
        <div className="mt-10 bg-black border border-gray-700 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Savings Visualization
          </h2>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

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

      {/* EMAIL FORM */}
      <div className="max-w-5xl mx-auto mt-10 bg-gray-900 border border-gray-700 rounded-3xl p-8">

        <h2 className="text-3xl font-bold">
          Get Full Audit Report
        </h2>

        <p className="text-gray-400 mt-3 mb-8">
          Download your personalized optimization report.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="founder@startup.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-black border border-gray-700"
            />

          </div>

          <div>

            <label className="block mb-2">
              Company Name
            </label>

            <input
              type="text"
              placeholder="Acme AI"
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-black border border-gray-700"
            />

          </div>

          <div>

            <label className="block mb-2">
              Your Role
            </label>

            <input
              type="text"
              placeholder="Founder"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-black border border-gray-700"
            />

          </div>

        </div>

        {/* BUTTONS */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">

          <button
            onClick={handleDownload}
            disabled={loading}
            className="bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 rounded-2xl"
          >

            {loading
              ? "Generating Report..."
              : "Download Full Report"}

          </button>

          <button
            onClick={handleShare}
            disabled={shareLoading}
            className="border border-gray-700 hover:border-gray-500 transition font-bold py-4 rounded-2xl"
          >

            {shareLoading
              ? "Generating Link..."
              : "Generate Shareable Link"}

          </button>

        </div>

      </div>

    </main>
  );
}