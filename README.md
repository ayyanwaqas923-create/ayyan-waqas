# O-LEVEL EXAM COACH AI

A full-stack Next.js app for Cambridge International O-Level revision, practice, timed exams, AI-assisted marking, and progress tracking.

## Features

- Subject dashboard for Mathematics, Computer Science, Accounting, Economics, Pakistan Studies, Islamiyat, Urdu, and English
- Practice and full-exam workflow
- Timer-based assessment with autosubmit on expiry
- Typed, handwritten-image, and PDF upload support
- AI-assisted marking with Gemini fallback heuristics
- Results, progress analytics, recommendations, and AI coach
- MongoDB-ready data layer and demo data for immediate local use

## Local setup

1. Copy the example env file:
   npm install
   cp .env.example .env.local
2. Add your MongoDB Atlas URI and Gemini API key if you want live cloud-backed AI and storage.
3. Start the app:
   npm run dev
4. Open http://localhost:3000

## Production readiness

This project is prepared for GitHub and uses environment variables for secrets. Do not commit real credentials or .env files.
