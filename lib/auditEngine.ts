export function generateAudit(
  tool: string,
  spend: number,
  seats: number,
  teamSize: number
) {

  let recommendedPlan = "";
  let recommendedSpend = spend;
  let reason = "";

  // ChatGPT Logic
  if (tool === "ChatGPT") {

    if (teamSize <= 2) {
      recommendedPlan = "ChatGPT Plus";

      recommendedSpend = seats * 20;

      reason =
        "Small teams usually don't require expensive Team subscriptions.";
    } else {
      recommendedPlan = "ChatGPT Team";

      recommendedSpend = seats * 30;

      reason =
        "Team collaboration features make sense for growing startups.";
    }
  }

  // Claude Logic
  if (tool === "Claude") {

    if (teamSize <= 3) {
      recommendedPlan = "Claude Pro";

      recommendedSpend = seats * 20;

      reason =
        "Claude Pro is usually sufficient for smaller research teams.";
    } else {
      recommendedPlan = "Claude Team";

      recommendedSpend = seats * 35;

      reason =
        "Larger teams benefit from Claude Team collaboration features.";
    }
  }

  // Cursor Logic
  if (tool === "Cursor") {

    if (teamSize < 5) {
      recommendedPlan = "Cursor Pro";

      recommendedSpend = seats * 20;

      reason =
        "Enterprise plans are often unnecessary for smaller engineering teams.";
    } else {
      recommendedPlan = "Cursor Business";

      recommendedSpend = seats * 40;

      reason =
        "Business plans help manage larger developer teams efficiently.";
    }
  }

  const savings = spend - recommendedSpend;

  return {
    recommendedPlan,
    recommendedSpend,
    savings,
    yearlySavings: savings * 12,
    reason,
  };
}