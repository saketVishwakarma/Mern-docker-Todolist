# 📝 MERN Todo App

A full-stack Todo application built using **MongoDB**, **Express**, **React**, and **Node.js** (MERN), Dockerized, scanned for vulnerabilities with **Trivy**, and deployed using **Docker Compose**.

---

## 🚀 Features

- Add, edit, delete, and mark todos as complete
- Material UI styling with dark mode support
- Timer & sound effects for game-like feedback
- REST API built using Node.js + Express
- MongoDB as the database
- Dockerized frontend and backend
- Trivy vulnerability scanning
- GitHub Actions CI/CD pipeline
- Tagged images pushed to Docker Hub

---

## 🧱 Project Structure

```
.
├── backend
│   └── Dockerfile
├── frontend
│   └── Dockerfile
├── docker-compose.yml
├── .github/workflows/ci-cd.yml
└── README.md
```

---

## 🐳 Docker Setup

### 1. Build and run locally

```bash
docker-compose up --build
```

Frontend will be available at: `http://localhost:3000`  
Backend API: `http://localhost:5000/api/todos`

### 2. Push to Docker Hub

Tag and push both images:

```bash
docker tag todo-frontend yourdockerhub/todo-frontend:v1.0.0
docker push yourdockerhub/todo-frontend:v1.0.0

docker tag todo-backend yourdockerhub/todo-backend:v1.0.0
docker push yourdockerhub/todo-backend:v1.0.0
```

---

## 🔐 Vulnerability Scanning with Trivy

Install Trivy and run:

```bash
trivy image yourdockerhub/todo-frontend:v1.0.0
trivy image yourdockerhub/todo-backend:v1.0.0
```

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

On `workflow_dispatch`, it will:

- Build Docker images
- Run Trivy scans
- Tag and push to Docker Hub
- Optionally deploy

---

## 📦 Environment Variables

Create a `.env` file in the backend and frontend if required:

```env
# backend/.env
MONGO_URI=mongodb://mongo:27017/todos

# frontend/.env
VITE_API_URL=http://localhost:5000
```

---

## ☁️ Optional: Deploy to Render / Azure / Railway

You can deploy the Docker images to cloud providers. See the `infra` folder (if added) for Terraform deployment on Azure.
