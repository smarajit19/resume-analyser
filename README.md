# ATS Resume Analyzer

A premium AI-powered ATS (Applicant Tracking System) resume analyzer built with **Vue 3 + Vite + Tailwind CSS + Pinia**.

Upload a resume + paste a job description → get instant ATS compatibility scoring, skill matching, keyword gap analysis, readability scoring, and AI-powered recommendations.

## ✨ Features

- 🎨 Modern SaaS UI (Linear / Vercel / Stripe inspired) with glassmorphism
- 🌗 Dark / light mode toggle (persisted in localStorage)
- 📤 Drag & drop file upload with validation (PDF/DOC/DOCX, max 5MB)
- 📊 Animated circular score charts (ATS, Skills, Job Match)
- 🧠 Full results dashboard: skills, keywords, formatting, readability, section structure, recommendations, final verdict
- 📥 Export full analysis as PDF
- 📋 Copy analysis JSON to clipboard
- 🔔 Toast notifications
- 📱 Fully responsive (mobile / tablet / desktop)
- 🗂️ Pinia state management, Vue Router, Axios with retry & timeout

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env` and set:
```
VITE_API_URL=https://smarajit94.app.n8n.cloud/webhook-test/resume-analyzer
```

### 3. Run dev server
```bash
npm run dev
```
Open http://localhost:5173

### 4. Build for production
```bash
npm run build
npm run preview
```

## 📡 API Contract

`POST {VITE_API_URL}` — `multipart/form-data` with **exact** field names:

| Field | Type | Description |
|---|---|---|
| `email` | string | User email |
| `data` | File | Resume file (PDF/DOC/DOCX) |
| `job_description` | string | Job description text |

> Note: `firstName`, `lastName`, and `phone` are collected for UI/business use but are **NOT** sent to the API.

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── Navbar.vue
│   ├── HeroSection.vue
│   ├── ResumeUploadForm.vue
│   ├── FileDropzone.vue
│   ├── ScoreCard.vue
│   ├── SkillsCard.vue
│   ├── InsightsCard.vue
│   ├── RecommendationCard.vue
│   ├── VerdictCard.vue
│   ├── LoadingOverlay.vue
│   └── Footer.vue
├── pages/
│   ├── HomePage.vue
│   └── ResultsPage.vue
├── services/
│   └── api.js
├── stores/
│   └── resumeStore.js
├── router/
│   └── index.js
├── assets/
│   └── main.css
├── App.vue
└── main.js
```

## 🚢 Deployment

Works out of the box on **Vercel**, **Netlify**, or any static host.

- **Vercel**: Import repo → Framework: Vite → set `VITE_API_URL` env → deploy
- **Netlify**: Build cmd `npm run build`, publish dir `dist`, add env var
- **Static**: `npm run build` → upload `dist/` folder

Make sure to set `VITE_API_URL` in your hosting platform's environment variables.

## 📝 License

MIT
