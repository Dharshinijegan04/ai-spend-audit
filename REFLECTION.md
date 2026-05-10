# Reflection

## 1. The hardest bug I hit this week

The hardest bug I encountered was related to savings calculations and result rendering. Initially, the application always showed $0 savings even when users entered larger spend values. I first assumed the issue was inside the audit engine logic, but after debugging I realized the form inputs were being stored as strings instead of numbers.

I tested multiple hypotheses:
- incorrect audit formulas
- broken React state updates
- failed rendering conditions
- incorrect type conversions

I used console logging throughout the application to inspect the values being passed into the audit engine. Eventually I discovered that values like spend and team size were stored as strings from the form inputs. This caused incorrect calculations during arithmetic operations.

The fix was converting form input values using Number() before passing them into calculations. After fixing the conversions, the savings calculations and charts started updating correctly.

This bug taught me the importance of validating input types carefully in TypeScript and React applications.

---

## 2. A decision I reversed mid-week

One major decision I reversed was using AI to generate the audit recommendations themselves.

Initially I planned to use OpenAI APIs for both savings recommendations and summary generation. However, after reading the assignment requirements more carefully, I realized the audit engine needed deterministic and finance-defensible logic rather than unpredictable AI outputs.

I switched the architecture to use hardcoded business rules for pricing recommendations while limiting AI usage only to personalized summaries.

This improved:
- consistency
- reliability
- explainability
- testing

The final architecture became much cleaner and aligned better with the assignment requirements.

---

## 3. What I would build in week 2

If I had another week, I would focus on improving the product experience and business intelligence features.

The first feature I would build is benchmarking mode. Users could compare their AI spend per developer against industry averages for similar startup sizes.

I would also improve:
- Open Graph previews
- PDF design quality
- analytics dashboard
- referral system
- automated follow-up emails
- onboarding flow

On the technical side, I would:
- improve API rate limiting
- add caching
- improve accessibility
- optimize Lighthouse scores further
- add more automated tests

I would also conduct more user interviews to validate whether the recommendations feel trustworthy to engineering managers and startup founders.

---

## 4. How I used AI tools

I used ChatGPT primarily as a development assistant throughout the project.

I used AI for:
- debugging help
- UI improvements
- TypeScript fixes
- architecture guidance
- documentation generation
- test generation

However, I did not trust AI with:
- pricing logic
- financial recommendations
- core audit calculations

One example where AI was wrong happened during the testing phase. AI-generated test values caused negative savings scenarios that made the tests fail unexpectedly. Initially the issue looked like a broken audit engine, but after manually reviewing the calculations I realized the test data itself was unrealistic.

This reinforced the importance of verifying AI-generated outputs carefully instead of trusting them blindly.

---

## 5. Self-rating

### Discipline — 8/10

I consistently worked across multiple days and maintained steady project progress.

### Code Quality — 7/10

The codebase is structured and functional, though there is still room for cleaner abstractions and reusable components.

### Design Sense — 8/10

I focused heavily on modern SaaS UI patterns, responsive layouts, and visual clarity.

### Problem Solving — 8/10

I debugged several deployment, calculation, and testing issues independently through iteration and experimentation.

### Entrepreneurial Thinking — 7/10

I approached the project as a real SaaS lead-generation product instead of only a coding exercise.