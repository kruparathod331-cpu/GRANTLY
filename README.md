HEAD
# GRANTLY — Your Potential Deserves Funding.
### A Premium, Aesthetic, AI-Powered Scholarship Discovery & Student Funding Ecosystem

**Created by Krupa Rathod**  
*Developed for THE OUTPOST — A 6-Hour Individual Frontend Development Hackathon (2026)*

---

## 🌟 Executive Summary

**GRANTLY** is an original student financial-assistance platform designed to transform how students discover scholarships, understand complex eligibility criteria, prepare required documentation, learn key application skills, and track funding opportunities from a unified command center.

Instead of a generic directory of dead links and confusing government portals, **GRANTLY** delivers a cozy, Gen Z-approved, editorial web platform that removes the anxiety, friction, and confusion from student funding.

> **"An original student innovation by Krupa Rathod ✦"**

---

## 🧭 The Core Journey

```
DISCOVER ──► MATCH ──► UNDERSTAND ──► PREPARE ──► APPLY ──► TRACK ──► LEARN
```

1. **DISCOVER**: Search and filter 16+ diverse, high-value fictional demo scholarships across engineering, arts, medicine, women in tech, and study abroad.
2. **MATCH**: Transparent profile matching algorithm compares course, GPA/percentage, education level, and household income.
3. **UNDERSTAND**: The "Why This Match?" diagnostic engine shows satisfied criteria, missing info, and actionable next steps without black-box scores.
4. **PREPARE**: Centralized **Document Vault** organizes transcripts, income certificates, and recommendations, coupled with an interactive **SOP Starter Generator**.
5. **APPLY**: Milestone dates, urgency radar (days remaining), and simulated application checklists.
6. **TRACK**: Fluid 6-stage Kanban board (`Interested`, `Preparing`, `Submitted`, `Under Review`, `Approved`, `Rejected`) with list view and notes editor.
7. **LEARN**: **GRANTLY LEARN**, a curated YouTube education hub streaming masterclasses on SOP writing, scholarship interviews, and financial aid fundamentals.

---

## 🎨 Visual Identity & Dynamic Theme Studio

GRANTLY combines Pinterest-inspired editorial warmth with modern SaaS clarity and a cozy Gen Z aesthetic. 

The application features **Theme Studio**, a dynamic visual engine powered by CSS Custom Properties that updates the entire platform instantly with zero page reloads:

| Theme Name | Background | Primary Brand | Secondary | Accent | Mood |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Lavender Dream** *(Default)* | `#F8F5FF` | `#8870E8` | `#DCD0FF` | `#F1C8E8` | Creative, Focused & Cozy |
| **Peach Blossom** | `#FFF7F2` | `#ED927B` | `#FFD7C8` | `#F4B6C8` | Warm, Uplifting & Optimistic |
| **Sage Garden** | `#F4F8F2` | `#789C80` | `#D6E6D5` | `#D7CBA9` | Grounded, Calm & Balanced |
| **Ocean Breeze** | `#F0F8FC` | `#428DB5` | `#BDE2F3` | `#B8DCCF` | Crisp, Clear & Expansive |
| **Butter Cream** | `#FFFBEF` | `#D5A94F` | `#F5E4A8` | `#F3C6A6` | Vintage, Warm & Editorial |
| **Midnight Mode** | `#151527` | `#A995FF` | `#383354` | `#C7E99B` | Deep, Luminous & Immersive |

*All themes persist in `localStorage` across refreshes and maintain strict WCAG accessibility contrast.*

---

## 🚀 Key Functional Modules

### 1. Personalized Student Command Center (`/dashboard`)
- Dynamic time-aware greeting with student name (`Good morning, Aarav! ✨`).
- Real-time statistics: Total Matched Grants, Bookmarked Opportunities, Pipeline In Progress, Doc Vault Readiness, and Potential Funding (`₹18.5 Lakhs`).
- **GRANTLY Smart Path™**: A visual 6-step interactive funding roadmap guiding students from profile completion to grant disbursement.
- **Application Readiness Diagnostic**: Indicative score (0-100%) calculated from profile parameters, verified documents, and active pipeline entries.
- **Deadline Radar**: Urgency indicators highlighting opportunities closing in the next 15–30 days.

### 2. Scholarship Discovery Engine (`/discover`)
- 16 diverse high-fidelity fictional demo scholarships clearly labeled with `DEMO DATA` tags.
- Multi-parameter live search across titles, providers, eligible courses, locations, and tags.
- Category filters: *STEM, Computer Science, Women in STEM, Need-Based, Merit-Based, Study Abroad, Arts & Design*.
- Education level filters (*Undergraduate*, *Postgraduate*) and annual family income ceiling toggles.
- Dynamic sorting: *Best Match Score, Highest Funding, Nearest Deadline, Alphabetical*.
- Side-by-side selection drawer to compare up to 3 scholarships.

### 3. Transparent "Why This Match?" Engine (`/scholarships/:id`)
- Evaluates student academic percentage, degree level, course relevance, and household income against official criteria.
- Returns transparent labels: *Strong Profile Match (≥80%)*, *Potential Match (60–79%)*, *Needs More Information (40–59%)*, or *Appears Ineligible (<40%)*.
- Details exactly which requirements are met, which are missing, and recommended next steps.
- Clear disclaimer: *Indicative demo calculation, not an official eligibility decision.*

### 4. Interactive Side-by-Side Comparison Modal
- Compare up to 3 shortlisted scholarships across:
  - Funding support amount (INR)
  - Education level & academic cutoff percentages
  - Family income ceilings
  - Eligible domicile/regions
  - Key required documents
  - Application deadlines and match diagnostics

### 5. Application Pipeline & Kanban Board (`/applications`)
- Full interactive Kanban board with 6 columns:
  `Interested` ➔ `Preparing` ➔ `Submitted` ➔ `Under Review` ➔ `Approved` ➔ `Rejected`.
- Instant status drag/dropdown updates with timestamp logging.
- Add custom application modal with provider, funding, target deadline, and checklist notes.
- Seamless toggle between **Kanban Board** and **List Table View**.
- Live persistence in `localStorage`.

### 6. Student Document Vault (`/documents`)
- Structured management for 8 essential verification categories:
  - *Resume / CV*
  - *Academic Transcripts*
  - *Board Mark Sheets*
  - *Income Certificate*
  - *Identity Proof (Aadhaar / Voter ID)*
  - *Faculty Letters of Recommendation (LOR)*
  - *Statement of Purpose (SOP)*
  - *Bonafide Letters & Enrollment Receipts*
- Status indicators: `Ready`, `Pending`, `Missing`.
- Simulated local file attachment (no files leave the browser).
- Automatic **Missing Document Alerts** cross-referenced with scholarship requirements.

### 7. Interactive SOP Starter Generator
- Creative assistant modal that generates a personalized 4-section narrative outline:
  - *Section 1: The Catalyst & Origin Story (The Hook)*
  - *Section 2: Academic Rigor & Tangible Project Milestones*
  - *Section 3: Financial Context & Resilience Explained with Dignity*
  - *Section 4: Long-Term Vision & Reciprocal Community Giveback*
- One-click copy to clipboard and `.txt` outline export.

### 8. GRANTLY AI — Floating Student Assistant
- Universally accessible floating widget at the bottom-right of every page.
- Context-aware rule-based reasoning engine connected to the student's current profile, saved scholarships, document vault readiness, and upcoming deadlines.
- Suggested prompt pills:
  - *"Find scholarships for my course"*
  - *"What documents should I prepare?"*
  - *"Help me structure my SOP"*
  - *"Which deadlines are approaching?"*
  - *"Explain merit-based vs need-based aid"*
- Rich response cards with actionable navigation buttons.
- Clear conversation, minimize, and expand controls.

### 9. GRANTLY LEARN — YouTube Education Hub (`/learn`)
- Curated educational streaming hub featuring verified public masterclasses from recognized educational channels (*CrashCourse, CareerVidz, College Admissions Experts, TED-Ed*).
- 5 Structured Learning Tracks:
  - *Scholarship Starter Pack*
  - *Winning SOP Masterclass*
  - *Interview Masterclass*
  - *Study Abroad Preparation*
  - *Financial Aid Fundamentals*
- Official embedded YouTube player modal with key takeaways and bookmarking.

### 10. Student Onboarding & Profile Customizer (`/onboarding`, `/profile`)
- Multi-step onboarding with progress bar, form validation, and confetti celebration.
- Editable academic GPA, university, degree, income range, and funding interests.
- Safe "Reset All Demo Data" option with confirmation modal.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Routing**: React Router v7 (Lazy loaded with route code-splitting)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Custom Properties (Theme Engine)
- **Icons**: Lucide React
- **Typography**: Manrope (Headings) & Inter (Body) via Google Fonts
- **Delight & Animations**: Canvas Confetti, soft-pulse CSS keyframes, card hover lift
- **State & Storage**: React Context API (`ThemeContext`, `StudentContext`) + LocalStorage

---

## 📂 Project Architecture

```
hackthon/
├── public/
│   └── favicon.svg                  # Custom graduation cap & sparkle SVG icon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Top navigation with mandatory creator branding
│   │   ├── Footer.jsx               # Footer credit & hackathon disclaimer
│   │   ├── ScholarshipCard.jsx      # Reusable scholarship card with match badge
│   │   ├── ScholarshipComparisonModal.jsx # Side-by-side comparison table
│   │   ├── SmartPath.jsx            # 6-step visual roadmap component
│   │   ├── SOPGeneratorModal.jsx    # Interactive SOP outline generator
│   │   ├── VideoPlayerModal.jsx     # YouTube embed video player modal
│   │   ├── ChatbotWidget.jsx        # Floating GRANTLY AI assistant
│   │   └── PageLoader.jsx           # Cozy suspense fallback loader
│   ├── context/
│   │   ├── ThemeContext.jsx         # 6 dynamic themes with CSS variable bindings
│   │   └── StudentContext.jsx       # Profile, applications, documents & storage
│   ├── data/
│   │   ├── scholarships.js          # 16 diverse high-fidelity fictional demo scholarships
│   │   └── learningVideos.js        # Curated verified YouTube educational videos
│   ├── pages/
│   │   ├── Landing.jsx              # High-converting landing page with hero mockup
│   │   ├── Onboarding.jsx           # 3-step student onboarding flow with confetti
│   │   ├── Dashboard.jsx            # Command center with stats, radar & recommendations
│   │   ├── Discover.jsx             # Search, filters, sorter & catalog
│   │   ├── ScholarshipDetails.jsx   # Detailed opportunity breakdown & diagnostics
│   │   ├── Applications.jsx         # Kanban board & list view application tracker
│   │   ├── SavedScholarships.jsx    # Bookmarked list with comparison selector
│   │   ├── DocumentVault.jsx        # Document checklist & verification tracker
│   │   ├── Learn.jsx                # YouTube educational video streaming hub
│   │   ├── ThemeStudio.jsx          # Live 6-theme preview and selector
│   │   └── Profile.jsx              # Student settings & data reset
│   ├── services/
│   │   ├── matchingService.js       # Transparent profile diagnostic algorithms
│   │   ├── chatbotService.js        # Context-aware student assistant engine
│   │   └── storageService.js        # LocalStorage persistence wrapper
│   ├── styles/
│   │   └── themes.css               # CSS variables for all 6 themes & transitions
│   ├── App.jsx                      # App entry with React.lazy code-splitting
│   ├── index.css                    # Tailwind v4 import & theme directives
│   └── main.jsx                     # Root React mounting
├── index.html                       # HTML shell with Google Fonts & metadata
├── package.json
└── vite.config.js                   # Vite 8 + @tailwindcss/vite + React
```

---

## ⚡ Installation & Local Development

1. **Clone or navigate to the repository directory**:
   ```bash
   cd c:\Users\dell\Desktop\hackthon
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Run a production build**:
   ```bash
   npm run build
   ```
   The production-ready artifacts will be generated in `dist/` with route-level chunking in under 1 second.

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 🔒 Data Honesty & Demo Boundaries

- **Demo Records**: All 16 scholarship entries are clearly flagged with `DEMO DATA` badges. They are designed for testing, workflow evaluation, and UI demonstration.
- **No False Claims**: Simulated application flows clarify that no real application has been submitted to a government agency or external trust.
- **Local Privacy**: Document attachments and personal information remain strictly within `localStorage` inside the user's browser; zero third-party cloud uploads are executed.
- **Zero Paid API Locks**: The entire application runs reliably without requiring paid OpenAI/Gemini API keys, external database connections, or fragile network dependencies during judging.

---

## 🏆 Creator Credit

- **Creator & Architect**: **Krupa Rathod**
- **Project**: **GRANTLY**
- **Tagline**: *Your Potential Deserves Funding.*
- **Event**: *THE OUTPOST Hackathon (2026)*

> *"GRANTLY is an independently developed student-focused project created by Krupa Rathod, designed to make educational financial assistance easier to discover, understand and manage."*

# GRANTLY
 298cab6df67f243b96c16cc52996b6aa5ef8ef3c
