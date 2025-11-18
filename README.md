

#  **ChronoVue — AI Career Timeline & Skill Prediction Platform**

ChronoVue is an AI-powered career prediction and timeline management platform designed to help users plan, track, and optimize their learning or career journey using smart analytics and real-time insights.

Instead of managing random notes, goals, and tasks across multiple tools, ChronoVue gives you a **visual timeline** of your progress — powered by **AI insights, career predictions, market skill analysis, and personalized recommendations**.

---

##  **Core Concept**

ChronoVue helps you answer the most important questions in your career:

* **Where am I right now?**
* **When will I be job-ready?**
* **What skills am I missing?**
* **What should I learn next?**
* **How does the market value my skills?**
* **What’s the most efficient path to my goal?**

Think of ChronoVue as **Google Maps for your career** — showing your current skill level, destination, and the optimal route to reach your dream job.

---

#  **Features**

## **1. Core Platform**

* **User Authentication** — Secure login/signup with onboarding flow
* **Dashboard** — Central hub with progress overview, insights, and shortcuts
* **Responsive UI** — Modern design with an orange-themed interface

---

## **2. Timeline Management**

* **Create Multiple Timelines** (career, learning, personal growth)
* **Interactive Milestones** with deadlines, priorities, and statuses
* **Visual Progress Tracking** with completion indicators
* **Smart Timeline Creation Wizard** for goal-based planning

---

## **3. AI-Powered Features**

### **Career Prediction System**

* Job-readiness prediction
* Personalized career roadmap
* Skill gap detection
* Strength & weakness insights
* Confidence scores and readiness timeline

### **AI Insights Dashboard**

* Skill radar
* Progress analytics
* Learning recommendations
* Predictive analysis using Google Gemini

---

## **4. Market Skills Analysis (Latest Release)**

* Market demand analysis
* Salary impact visualization
* Skill gap detection
* Skill ROI (return on investment) calculation
* Trend insights (Growing, Stable, Declining skills)
* Custom learning paths based on your profile
* Export full reports as PDF
* Interactive charts, heatmaps, and visual data

---

## **5. Growth & Learning Tools**

* **Journal System** — reflections, mood tracking, and progress documentation
* **Resource Hub** — curated learning resources, tools, and guides
* **Learning Paths** — AI-generated structured learning sequences

---

## **6. Community Features**

* Public & private community spaces
* Posts, discussions, resources sharing
* Social features: likes, comments, saves, interactions

---

## **7. Integrated AI Assistant**

* Context-aware assistance across the entire platform
* Personalized answers based on timelines, skills, and goals
* Interview preparation, project help, learning suggestions

---

# **Project Structure**

```
/chronovue
 ┣ /app
 ┃ ┣ /api
 ┃ ┣ /auth
 ┃ ┣ /community
 ┃ ┣ /dashboard
 ┃ ┃ ┣ /admin
 ┃ ┃ ┣ /mentor(comming soon)
 ┃ ┃ ┗ /user
 ┃ ┣ /onboarding
 ┃ ┣ layout.tsx
 ┃ ┣ loading.tsx
 ┃ ┣ page.tsx
 ┃ ┗ globals.css
 ┣ /components
 ┃ ┣ /Admin
 ┃ ┣ /Community
 ┃ ┣ /Dashboard
 ┃ ┣ /AI Assistant
 ┃ ┣ /AI Insights
 ┃ ┣ /MarketSkillsAnalysis
 ┃ ┣ /Mentor
 ┃ ┣ /Timelines
 ┃ ┣ /Homepage
 ┃ ┣ /ui
 ┃ ┗ Navbar.tsx
 ┣ /lib
 ┃ ┣ /generated
 ┃ ┣ currentLoggedInUserInfo.ts
 ┃ ┣ isAdmin.ts
 ┃ ┣ isMentor.ts
 ┃ ┣ prisma.ts
 ┃ ┗ utils.ts
 ┣ /prisma
 ┣ /public
 ┣ /utils
 ┗ /hooks
```

---

#  **Tech Stack**

* **Next.js 15** — App Router, Server Components
* **TypeScript** — Strong typing & scalability
* **TailwindCSS** — Fast and modern UI styling
* **PostgreSQL** — Primary database
* **Prisma** — ORM for database management
* **NextAuth** — Authentication
* **Google Gemini AI** — AI predictions & insights
* **Recharts** — Data visualizations
* **Razorpay** — Secure payments

---

#  **In Development**

* Advanced Mentorship System (currently disabled)
* Notification Center (smart alerts & reminders)
* Performance enhancements

---

# **Planned Features**

* Team collaboration
* Advanced exports & analytics
* Mobile application
* External learning platform integrations
* Premium subscription tier

---

# **Getting Started**

## **Prerequisites**

* Node.js 20+
* PostgreSQL installed
* Google Gemini API key
* Razorpay keys (optional for payments)

---

## **Installation**

```bash
git clone https://github.com/harshdhankhar10/chronovue.git
cd chronovue
npm install

cp .env.example .env.local
# Fill in database + API keys

npx prisma generate
npx prisma db push

npm run dev
```

---

# **Communication & Notifications**

* Welcome email
* Progress summaries
* Reflection reminders
* Community notifications
* AI Insight reports
* In-dashboard notification system

---

# **Contributing**

Contributions are welcome!
You can:

* Report bugs
* Request new features
* Submit PRs
* Improve documentation
* Suggest UI/UX improvements

---

# **License**

**MIT License** — Open-source and free to modify.

---

# **Latest Release — Version 1.3**

### 🆕 **Market Skills Analysis**

* Salary impact calculator
* Skill gap & ROI analysis
* Trend visualizations
* Personalized learning recommendations
* Full PDF export
* Real-time market trend tracking
* Enhanced insights dashboard
* UI/UX upgrades

---

# **About**

ChronoVue aims to make career planning scientific, personalized, and accessible.
No more guesswork — just clear data, tailored roadmaps, and powerful AI support.

---

