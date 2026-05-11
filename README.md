# AI Spend Audit

AI Spend Audit is a SaaS-style web application that helps startups and engineering teams analyze AI tooling costs and identify potential savings opportunities.

The platform evaluates tools like ChatGPT, Claude, Cursor, GitHub Copilot, and Gemini to recommend more cost-efficient plans and alternatives.

---

# Live Demo

https://ai-spend-audit-dkro8dbul-dharshinijegans-projects.vercel.app

---

# Features

- AI spend audit engine
- Savings calculation
- Personalized AI-generated summaries
- Shareable audit URLs
- Supabase backend integration
- PDF report export
- Charts and savings visualization
- Responsive modern UI
- Lead capture form
- Automated tests using Vitest

---

# Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- OpenAI API
- Recharts
- jsPDF
- Vitest
- Vercel

---

# Screenshots

## Home Page

![Home Page](./public/screenshots/home.png)

---

## Audit Form

![Audit Form](./public/screenshots/form.png)

---

## Result Page

![Result Page](./public/screenshots/result.png)

---

## Savings Chart

![Savings Chart](./public/screenshots/chart.png)

---

## AI Summary

![AI Summary](./public/screenshots/summary.png)

---

## Shareable Link

![Shareable Link](./public/screenshots/shareable-link.png)

---

# Local Development

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

# Run Tests

```bash
npm run test
```

---

# Architecture Decisions

- Used Next.js App Router for modern routing and deployment support
- Used Supabase for backend database management
- Used TypeScript for maintainability and type safety
- Used deterministic audit logic for explainable financial recommendations
- Used OpenAI only for personalized summaries

---

# Deployment

Deployed on Vercel.

---

# Author

Dharshini Jegan