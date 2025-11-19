# Mock Practice Assessment – React (Travel Booking Platform)

This folder contains only the **application code** (src/, public/) plus a **db.json** for `json-server`.Create the CRA PWA project first, then copy these files into it.

## 0) Prereqs
- Node 18+ and npm
- VS Code

## 1) Create the React app (with PWA template and Bootstrap CDN)
```bash
npx create-react-app travel-booking --template cra-template-pwa
cd travel-booking
```

## 2) Install dependencies
```bash
npm i react-router-dom@6 react-transition-group prop-types formik yup @reduxjs/toolkit react-redux
npm i -D json-server
```

## 3) Replace app code
Copy the **src/** and **public/** folders from this archive into your CRA project (overwrite existing).Also copy **db.json** to the project root.

## 4) Start the mock API
In a separate terminal from the project root:
```bash
npx json-server --watch db.json --port 4000
```

## 5) Run the React app
```bash
npm start
```

Routes:
- `/home` – Featured destinations (User Story 1)
- `/packages` – Fetches from json-server (User Story 2)
- `/contact` – Static page
- `/booking/:id` – Formik + Yup + Redux Toolkit (User Story 3)
- `/dashboard` – Bonus: Redux status flow

## 6) Build PWA
```bash
npm run build
npx serve -s build
```
Open http://localhost:3000 and check **Application → Service Workers** in DevTools.

## Submission
- Zip your CRA folder, add screenshots in `screenshots/` (home, packages, booking).
- Include this README.
