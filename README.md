# CareerHub

Full-stack Job, Internship & Hackathon Portal with React + Node.js + MongoDB.

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Axios, React Router, Framer Motion  
**Backend:** Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcryptjs

## Setup

### 1. Environment

```bash
# Backend
cp backend/.env.example backend/.env
# Add your MongoDB Atlas URI and JWT_SECRET

# Frontend (optional)
cp .env.example .env
```

### 2. Install

```bash
npm install
cd backend && npm install && cd ..
```

### 3. Seed Database

```bash
npm run seed        # Create admin user
npm run seed:data   # Seed sample jobs/internships/hackathons
```

Default admin: `admin@careerhub.com` / `admin123`

### 4. Run

```bash
# Terminal 1 - Backend
npm run server:dev

# Terminal 2 - Frontend
npm run dev
```

- Portal: http://localhost:5173
- Admin: http://localhost:5173/admin

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/admin/login | Admin login |
| GET | /api/jobs | Public jobs |
| GET | /api/internships | Public internships |
| GET | /api/hackathons | Public hackathons |
| POST | /api/subscribe | Newsletter subscribe |
| GET | /api/search | Global search |
| GET | /api/stats | Public stats |

Admin CRUD routes are protected with JWT at `/api/jobs/admin/*`, `/api/internships/admin/*`, `/api/hackathons/admin/*`, `/api/subscribers`.

## Project Structure

```
backend/
├── config/         # Database connection
├── controllers/    # Route handlers
├── middleware/     # Auth, validation, errors
├── models/         # Mongoose schemas
├── routes/         # API routes
├── services/       # Business services
└── utils/          # Helpers & seed scripts

src/
├── components/     # UI components (unchanged design)
├── pages/          # Home, detail pages, admin
├── services/       # Axios API layer
├── hooks/          # Data fetching hooks
└── context/        # Auth, theme, toast
```
