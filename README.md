
# ChronoVue

ChronoVue is an **AI-powered future timeline platform**. The goal of this project is to help people **plan, track, and visualize their life, career, or learning goals** in a simple but powerful way.

Unlike basic to-do lists or task managers, ChronoVue focuses on the **bigger picture**. It lets users see their journey as a timeline — with milestones, reflections, and AI insights — so they can stay motivated and on track.

---

## 🌟 What is ChronoVue?

ChronoVue is your **personal roadmap builder** that helps you:

* Create **visual timelines** for career, education, and personal goals
* Add **milestones** with deadlines, priorities, and progress tracking
* Write **reflective journals** to document your growth journey
* Get **AI-powered insights** and personalized recommendations
* Access **curated resources** and learning paths
* Connect with **community** of like-minded learners
* Use **AI Assistant** for real-time guidance and support

---

## ✅ Completed Features

### **Core Platform**
- **User Authentication & Onboarding** - Secure signup/login with personalized setup
- **Dashboard** - Central hub with progress overview and quick actions
- **Responsive UI Design** - Modern interface with orange primary theme

### **Timeline Management**
- **Interactive Timelines** - Create and manage multiple timelines
- **Smart Milestones** - Break down goals with deadlines and priorities
- **Progress Tracking** - Visual progress indicators and status updates
- **Timeline Creation** - Easy setup with categories and duration settings

### **AI-Powered Features**
- **AI Insights Dashboard** - Comprehensive progress analytics and skill gap analysis
- **Personalized Recommendations** - AI-generated action plans and suggestions
- **ChronoAI Assistant** - Context-aware chat assistant across all pages
- **Progress Predictions** - Timeline confidence scores and completion estimates

### **Learning & Growth**
- **Journal System** - Mood tracking, reflections, and growth documentation
- **Resource Hub** - Curated learning materials and personalized recommendations
- **Learning Paths** - Structured resource collections for skill development

### **Community & Social**
- **Community Spaces** - Public/private communities with various engagement options
- **Content Sharing** - Posts, timeline shares, and milestone celebrations
- **Social Features** - Likes, comments, saves, and community interactions

---

## 🚧 In Development

### **Mentorship System** *(Planned for Next Release)*
- Mentor profiles and verification system
- Session booking and management
- AI-powered mentor matching
- Payment integration for premium sessions

### **Advanced Features** *(Coming Soon)*
- Team collaboration and shared timelines
- Advanced analytics and export capabilities
- Mobile app development
- Integration with external learning platforms

---

## 🛠️ Tech Stack

* **Next.js 15** - Modern React-based framework
* **TailwindCSS** - Responsive, professional UI design
* **Prisma** - Database ORM
* **PostgreSQL** - Database
* **NextAuth** - Authentication system
* **TypeScript** - Type safety and scalability
* **Google Gemini AI** - AI-powered insights and assistance

---

## 📂 Project Structure

```
/chronovue
 ┣ /app
 ┃ ┣ /api
 ┃ ┣ /auth
 ┃ ┣ /community
 ┃ ┣ /dashboard
 ┃ ┃ ┣ /admin
 ┃ ┃ ┣ /mentor
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
 ┃ ┣ /Mentor
 ┃ ┣ /Timelines
 ┃ ┣ /Homepage
 ┃ ┣ /ui
 ┃ ┣ Homepage.tsx
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

## 🎯 Implementation Roadmap

### ✅ **Completed**
1. Authentication & Onboarding
2. Dashboard & Core UI
3. Timeline Creation & Management
4. AI Insights & Analytics
5. Journal & Reflection System
6. Community Spaces
7. Resource Hub
8. ChronoAI Assistant

### 🔄 **In Progress**
1. Mentorship Matching System
2. Advanced Notification System
3. and many more
### 🔜 **Planned**
1. Team Collaboration Features
2. Advanced Export & Reporting
3. Mobile Application
4. Premium Subscription Features
4. and many more

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- PostgreSQL database
- Google Gemini API key

### Installation
```bash
git clone https://github.com/harshdhankhar10/chronovue.git
cd chronovue
npm install
cp .env.example .env.local
# Configure your environment variables
npx prisma generate
npx prisma db push
npm run dev
```

---

## 📧 Communication Features

- Welcome Email (after signup)
- Progress Summary Emails
- Reflection Reminders
- Community Engagement Notifications
- AI Insight Reports
- In Dashboard Notification System

---

## 🤝 Contributing

This project is open to contributions! Feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation

---

## 📜 License

MIT License — Free to use and modify.

---

## 🎉 Latest Updates

**Version 1.2** - Major Feature Release
- ✅ Added comprehensive AI Insights dashboard with end to end analytics
- ✅ Implemented ChronoAI Assistant across all pages
- ✅ Launched Resource Hub with learning paths
- ✅ Enhanced timeline functionality - create directly from AI Insights Dashboard
- ✅ Improved UI/UX with modern design system
- ✅ Added notifications system


