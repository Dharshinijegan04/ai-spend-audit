# Prompts

## AI Summary Prompt

The following prompt was used to generate personalized audit summaries for users.

---

### Prompt

```txt
You are an AI cost optimization consultant.

Analyze the following AI spending data and generate a short professional business summary.

Tool: {tool}
Current Plan: {plan}
Monthly Spend: {spend}
Team Size: {teamSize}
Recommended Plan: {recommendedPlan}
Estimated Yearly Savings: {yearlySavings}

Requirements:
- Keep the response under 100 words
- Use professional business language
- Clearly explain optimization opportunities
- Mention estimated savings
- Avoid exaggeration
- Sound like a SaaS financial consultant
```

---

# Why This Prompt Was Used

The prompt was designed to:
- generate concise summaries
- maintain professional tone
- avoid hallucinated financial advice
- keep recommendations aligned with the deterministic audit engine

The AI model was intentionally limited to summarization rather than generating pricing recommendations.

This ensured:
- financial consistency
- predictable outputs
- explainable audit calculations

---

# What Didn't Work

Initially I experimented with AI-generated audit recommendations.

Problems encountered:
- inconsistent pricing suggestions
- hallucinated plans
- unrealistic savings estimates
- poor financial explainability

Because the assignment specifically required defensible pricing logic, I moved all financial calculations into deterministic TypeScript rules and used AI only for personalized summaries.