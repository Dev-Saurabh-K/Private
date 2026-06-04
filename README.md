# SynaptiQ — Technical Documentation

## Executive Summary
SynaptiQ is an AI-powered interactive study companion built to transform passive reading into active, personalized learning. Designed around a modern, bold neo-brutalist aesthetic, the web application allows users to input any topic or upload syllabi (PDF/DOCX) to instantly generate structured notes. The application dynamically segments learning material into bite-sized subtopics, pairs keywords with context-aware Wikipedia pop-ups, dynamically updates interactive graphs, hosts custom knowledge retention quizzes, and automatically queues low-score segments into a dedicated learning backlog to ensure comprehensive topic mastery.

---

## Technology Stack & Frameworks

### Frontend Architecture
* **Core Framework:** React 19 (v19.2.6) leveraging StrictMode for robust runtime checks.
* **Build System & Tooling:** Vite 8 (v8.0.12) utilizing @vitejs/plugin-react for blazing-fast Hot Module Replacement (HMR) and optimized building.
* **Routing:** React Router DOM v7 (v7.16.0) utilizing declarative client-side route handling via createBrowserRouter.
* **Global State Management:** Zustand (v5.0.14) providing decoupled, light, and reactive store-based states.

### Styling & UI/UX Componentry
* **Styling Engines:** Tailwind CSS v4 paired with custom standard stylesheets (index.css, theme.css) and inline semantic CSS object wrappers.
* **Component Libraries:** Material UI (@mui/material) paired with @emotion/react and @emotion/styled for intricate styled layouts.
* **Icons:** Lucide React (lucide-react) for standard UI visual queues.
* **Data Visualization:** Chart.js with its React bindings (react-chartjs-2) for real-time progress charts and score history.

### Utility Dependencies
* **HTTP Client:** Axios (v1.16.1) for asynchronous communication with external microservices and AI endpoints.
* **Notifications:** React Toastify (react-toastify) for app-wide actionable pop-up alerts.
* **File Interactivity:** React Dropzone (react-dropzone) for handling smooth syllabus and PDF uploads.
* **Contribution Charting:** React GitHub Calendar (react-github-calendar) for tracking and gamifying continuous user study habits.

---

## Project Architecture & Directories

The application separates concerns by dividing components into routes, structural state engines, layout designs, and modular micro-components.

```text
├── package.json                   # Dependency tree, global scripts, and project metadata
├── vite.config.js                 # Bundler rules and plug-in alignments
├── eslint.config.js               # Code hygiene and linting constraints
├── index.html                     # Entry HTML hook
├── public/                        # Shared assets (favicon, icons)
└── src/
    ├── main.jsx                   # Global entrypoint, React DOM rendering, and App routers
    ├── styles/
    │   ├── index.css              # Main global style overrides
    │   └── theme.css              # Typography configurations and app variables
    ├── store/                     # State infrastructure split per context
    │   ├── batchStore.js
    │   ├── counterStore.js
    │   ├── historyRefreshToken.js
    │   ├── historyStore.js
    │   ├── notesStore.js
    │   ├── quizStore.js
    │   └── topicStore.js
    └── pages/                     # Structured application views
        ├── (LandingPage)/         # SynaptiQ.jsx (Landing page layout)
        ├── (Auth)/                # Login.jsx, Signup.jsx
        ├── (Dashboard)/           # Dashboard.jsx, Navbar.jsx, UploadPDF.jsx, HistoryComp.jsx
        ├── (Analytics)/           # Analytics.jsx, BarChart.jsx
        ├── (History)/             # History.jsx
        ├── (Notes)/               # Notes.jsx, Chat.jsx, HighlightedNotes.jsx, QuizSection.jsx, KeywordCard.jsx
        ├── (Quiz)/                # Quiz.jsx
        ├── (TopicCard)/           # Topics.jsx, Chip.jsx
        └── (UserProfile)/         # User.jsx, LoginRecord.jsx