# SkillCheck — Course-based MCQ Interview Portal

## Features
- Student registration and sign-in with separate accounts by email
- Each student's interview history and best scores are stored separately
- Course selection (HTML/CSS, JavaScript, React, Python, Java, SQL)
- Five MCQs per interview, displayed one question at a time
- Previous/next navigation and question progress
- Final score, percentage, pass/keep-practicing status, and answer review
- Local browser storage for demo student profile and recent results
- Responsive layout for desktop and mobile

## Run
```bash
npm install
npm run dev
```
Open the URL printed by Vite, normally `http://localhost:5173`.

## Build
```bash
npm run build
```

## Deploy on Vercel
Push the folder to GitHub, import the repository in Vercel, choose Vite, set build command to `npm run build` and output directory to `dist`.

## Important
This is a frontend demonstration. Accounts and results are stored locally in the browser and are not secure authentication. Different students can register with different email addresses on the same browser, sign out, and sign in later to see their own history. For a real production portal, add a backend, password hashing, database, and server-side result storage.
