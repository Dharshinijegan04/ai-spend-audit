// lib/auditEngine.ts

export type AuditResult = {
  tool: string;
  currentSpend: number;
  recommendedPlan: string;
  recommendedSpend: number;
  savings: number;
  yearlySavings: number;
  reason: string;
};

export function generateAudit(
  tool: string,
  spend: number,
  seats: number,
  teamSize: number
): AuditResult {

  let recommendedPlan = "Current Plan";

  let recommendedSpend = spend;

  let reason =
    "Your current setup already appears optimized.";

  // =========================
  // CHATGPT
  // =========================

  if (tool === "ChatGPT") {

    if (teamSize <= 2) {

      recommendedPlan = "ChatGPT Plus";

      recommendedSpend = 20;

      reason =
        "Small teams usually do not require expensive enterprise subscriptions.";

    } else if (teamSize <= 10) {

      recommendedPlan = "ChatGPT Team";

      recommendedSpend = 30;

      reason =
        "Team collaboration features are useful for growing startups.";

    } else {

      recommendedPlan = "ChatGPT Enterprise";

      recommendedSpend = 60;

      reason =
        "Enterprise plans are better suited for large organizations.";
    }
  }

  // =========================
  // CLAUDE
  // =========================

  if (tool === "Claude") {

    if (teamSize <= 3) {

      recommendedPlan = "Claude Pro";

      recommendedSpend = 20;

      reason =
        "Claude Pro is sufficient for smaller research teams.";

    } else {

      recommendedPlan = "Claude Team";

      recommendedSpend = 35;

      reason =
        "Claude Team improves collaboration for larger teams.";
    }
  }

  // =========================
  // CURSOR
  // =========================

  if (tool === "Cursor") {

    if (teamSize < 5) {

      recommendedPlan = "Cursor Pro";

      recommendedSpend = 20;

      reason =
        "Cursor Pro is ideal for smaller engineering teams.";

    } else {

      recommendedPlan = "Cursor Business";

      recommendedSpend = 40;

      reason =
        "Cursor Business supports larger engineering workflows efficiently.";
    }
  }

  // =========================
  // GITHUB COPILOT
  // =========================

  if (tool === "GitHub Copilot") {

    if (teamSize <= 3) {

      recommendedPlan = "Copilot Individual";

      recommendedSpend = 10;

      reason =
        "Individual plans are usually enough for small developer teams.";

    } else {

      recommendedPlan = "Copilot Business";

      recommendedSpend = 19;

      reason =
        "Business plans improve administration and collaboration.";
    }
  }

  // =========================
  // GEMINI
  // =========================

  if (tool === "Gemini") {

    if (teamSize <= 2) {

      recommendedPlan = "Gemini Pro";

      recommendedSpend = 20;

      reason =
        "Gemini Pro works well for smaller AI workflows.";

    } else {

      recommendedPlan = "Gemini Ultra";

      recommendedSpend = 50;

      reason =
        "Ultra plans provide better scaling for larger teams.";
    }
  }

  // =========================
  // SAVINGS
  // =========================

  let savings = spend - recommendedSpend;

  // NEVER NEGATIVE

  if (savings < 0) {
    savings = 0;
  }

  return {
    tool,
    currentSpend: spend,
    recommendedPlan,
    recommendedSpend,
    savings,
    yearlySavings: savings * 12,
    reason,
  };
}