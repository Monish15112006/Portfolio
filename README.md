# Monish – Portfolio

A world-class MERN Stack portfolio website built with React, Vite, Tailwind CSS, Framer Motion, Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

---

### Backend Setup

```bash
cd server
cp .env.example .env        # Fill in your MONGO_URI
npm install
npm run dev                 # Runs on http://localhost:5000
```

**Environment variables (`server/.env`):**
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/portfolio
PORT=5000
CLIENT_URL=http://localhost:5173
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev                 # Runs on http://localhost:5173
```

---

## 📁 Folder Structure

```
Portfolio/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # Navbar, Footer, UI primitives, Particles
│       ├── sections/       # Hero, About, Skills, Experience, Projects,
│       │                   # Achievements, OpenSource, GitHub, Contact
│       ├── hooks/          # useTheme, useScrollProgress, useCounter
│       └── utils/          # Static data
└── server/                 # Express + Mongoose backend
    ├── config/             # MongoDB connection
    ├── controllers/        # Route handlers + static data
    ├── models/             # Message schema
    └── routes/             # API routes
```

---

## 🌐 API Endpoints

| Method | Route              | Description              |
|--------|--------------------|--------------------------|
| GET    | /api/profile       | Portfolio profile data   |
| GET    | /api/projects      | All projects             |
| GET    | /api/skills        | Skills by category       |
| GET    | /api/achievements  | Achievements list        |
| POST   | /api/contact       | Send contact message     |

---

## 🚢 Deployment

### Frontend → Vercel
```bash
cd client && npm run build
# Deploy the client/ folder to Vercel
# Set VITE_API_URL env var to your Render backend URL
```

### Backend → Render
```bash
# Point Render to server/index.js
# Set MONGO_URI and CLIENT_URL environment variables on Render
```

---

## ✨ Features

- Glassmorphism dark UI inspired by Linear, Vercel, Raycast
- Framer Motion animations + page transitions
- Particle background with interactive repulse
- Typewriter effect in hero section
- Animated scroll progress bar
- Dark / Light mode toggle
- Animated counters on About section
- Filterable project cards
- Interactive achievement timeline
- Open Source contribution showcase
- GitHub activity section
- Contact form with MongoDB storage
- Fully responsive mobile-first layout
- SEO meta tags

---

## 🛠 Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS v4, Framer Motion, React Icons, tsParticles, react-type-animation, Axios  
**Backend:** Node.js, Express, Mongoose, express-rate-limit, dotenv, cors  
**Database:** MongoDB Atlas  
**Deployment:** Vercel (client) + Render (server)
