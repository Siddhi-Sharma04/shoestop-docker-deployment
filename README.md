# 👟 ShoeStop – MERN Stack Application with Docker & Cloud Deployment

<div align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Node.js-18-339933?logo=node.js" />
  <img src="https://img.shields.io/badge/Express-4.18-000000?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker" />
</div>

---

## 📋 Project Overview

ShoeStop is a full-stack MERN e-commerce web application for browsing and purchasing shoes. This repository contains the complete Docker containerization setup for the original application, enabling it to run as a multi-container system locally and on cloud platforms.

**Original Repositories:**
- Frontend: https://github.com/sriram-R-krishnan/shoestop-frontend
- Backend: https://github.com/sriram-R-krishnan/shoestop-backend

---

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Docker Network                         │
│                 (shoestop-network)                       │
│                                                          │
│  ┌────────────────┐        ┌────────────────────────┐  │
│  │   Frontend     │        │      Backend           │  │
│  │  (React+Vite)  │───────▶│   (Node.js+Express)   │  │
│  │  Nginx:80      │        │      Port 5000         │  │
│  │  Host: 3000    │        │   Host: 5000           │  │
│  └────────────────┘        └───────────┬────────────┘  │
│                                         │                │
└─────────────────────────────────────────┼────────────────┘
                                          │
                              ┌───────────▼────────────┐
                              │    MongoDB Atlas        │
                              │  (External Cloud DB)   │
                              └────────────────────────┘
```

---

## 🛠️ Technologies Used

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Bootstrap 5, Axios |
| Backend | Node.js 18, Express.js 4 |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT + bcrypt |
| Containerization | Docker, Docker Compose |
| Web Server | Nginx 1.25 (Alpine) |
| Cloud Deployment | Render |

---

## 📁 Repository Structure

```
ShoeStop-Docker-Deployment/
│
├── frontend/
│   ├── src/
│   │   ├── component/
│   │   │   ├── cart/Cart.jsx
│   │   │   ├── contextAPI/Context.jsx
│   │   │   ├── fav/Fav.jsx
│   │   │   ├── home/Home.jsx, Product.jsx, Banner.jsx
│   │   │   ├── login/Login.jsx
│   │   │   ├── navbar/Navbar.jsx, NavbarLog.jsx
│   │   │   └── signup/Signup.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile          ← Multi-stage (Node build + Nginx serve)
│   ├── nginx.conf          ← SPA routing config
│   └── .dockerignore
│
├── backend/
│   ├── controllers/        ← Business logic
│   ├── routes/             ← Express routes
│   ├── modal/              ← Mongoose schemas
│   ├── middlewares/        ← Auth middleware
│   ├── db/connectDB.js     ← MongoDB connection
│   ├── server.js           ← Entry point
│   ├── Dockerfile          ← Multi-stage production image
│   └── .dockerignore
│
├── docker-compose.yml      ← Multi-container orchestration
├── .env.example            ← Template for environment variables
├── .env                    ← Your actual env vars (NOT committed)
├── .gitignore
└── README.md
```

---

## ✅ Prerequisites

Make sure you have installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (v24+)
- [Docker Compose](https://docs.docker.com/compose/) (bundled with Docker Desktop)
- [Git](https://git-scm.com/)

Verify:
```bash
docker --version
docker compose version
```

---

## 🚀 Local Installation & Docker Setup

### 1. Clone this repository
```bash
git clone <this-repo-url>
cd ShoeStop-Docker-Deployment
```

### 2. Configure environment variables
```bash
cp .env.example .env
# Edit .env and fill in your MongoDB URI and JWT secret
```

### 3. Build and start all containers
```bash
docker compose up --build
```

This command will:
- Build the backend Node.js image
- Build the frontend React app and package it into Nginx
- Start both containers connected on a shared network

### 4. Access the application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## ⚙️ Environment Variable Configuration

| Variable | Description | Example |
|---|---|---|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT token signing | `your-random-secret` |
| `JWT_EXPIRY` | JWT token expiry | `30d` |
| `CORS_ORIGIN` | Allowed CORS origins | `*` or `https://yoursite.com` |
| `VITE_API_URL` | Backend URL baked into frontend build | `http://localhost:5000` |

---

## 🗄️ MongoDB Setup (Atlas)

1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Create a database user with read/write permissions
4. Whitelist your IP (or `0.0.0.0/0` for unrestricted)
5. Click **Connect** → **Connect your application** → copy the URI
6. Replace the `MONGO_URI` value in your `.env` file

---

## 🐳 Docker Compose Commands

```bash
# Build and start all services
docker compose up --build

# Start in detached mode (background)
docker compose up -d --build

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f backend
docker compose logs -f frontend

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v

# Rebuild a single service
docker compose up --build backend

# Check container status
docker compose ps
```

---

## ☁️ Cloud Deployment (Render)

### Backend Deployment
1. Create account at https://render.com
2. Click **New Web Service** → connect GitHub repo
3. Select the `backend/` directory
4. Set **Environment**: Docker
5. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRY`, `CORS_ORIGIN`
6. Deploy → copy the backend URL (e.g. `https://shoestop-api.onrender.com`)

### Frontend Deployment
1. Click **New Web Service** → connect same repo
2. Select the `frontend/` directory
3. Set **Environment**: Docker
4. Add build arg: `VITE_API_URL=https://shoestop-api.onrender.com`
5. Deploy → public URL ready

---

## 🌐 Public Deployment URL

> **Live Application**: *(URL will be updated after cloud deployment)*

---

## 🔍 Troubleshooting

| Problem | Solution |
|---|---|
| `Cannot connect to MongoDB` | Check MONGO_URI format, Atlas IP whitelist |
| `Frontend shows blank page` | Check browser console for CORS errors; verify VITE_API_URL |
| `Container exits immediately` | Run `docker compose logs backend` to see the error |
| `Port already in use` | Change host ports in docker-compose.yml |
| `Vite build fails` | Make sure VITE_API_URL build arg is set |

---

## 📄 License

MIT
