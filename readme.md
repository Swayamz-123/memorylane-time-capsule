# 🕰️ MemoryLane — Digital Time Capsule Platform

## Live Demo:
🔗 https://memorylane-time-capsule.vercel.app

MemoryLane is a production-ready digital time capsule platform that allows users to preserve memories (text, images, audio, video) and unlock them in the future — either by time or by life events.
It combines secure authentication, collaboration, AI-powered memory assistance, and scheduled background jobs to create a meaningful and emotionally engaging experience.

##🌟 Project Vision

“Memories shouldn’t be forgotten — they should wait.”

MemoryLane lets users:

Store moments securely

Share memories with loved ones

Unlock them at the right moment

Enhance them with AI insights

Reflect, react, and comment together after unlocking

This project was designed with real-world scalability, strict access control, and production-level architecture in mind.

## 🚀 Live Application

Deployement Link: https://memorylane-time-capsule.vercel.app

Backend: Deployed with persistent background jobs in render (cron-safe)

## 🧠 Key Highlights (Why this stands out)

✔ Event-based unlocking (not just date-based)
✔ AI-generated summaries, captions & audio transcription
✔ Strict capsule privacy & access control
✔ Collaboration + recipients system
✔ Scheduled background jobs (no manual unlock hacks)
✔ Production-grade authentication with refresh tokens
✔ Clean UX flows (grouped themes, filters, dashboards)

## 🛠️ Tech Stack
Frontend

React.js

React Router

Tailwind CSS

Axios

Context API (Auth Management)

## Backend

Node.js

Express.js

MongoDB & Mongoose

JWT Authentication (Access + Refresh Tokens)

bcrypt (password hashing)

Multer (media uploads)

Cloudinary (image/audio/video storage)

Nodemailer (email notifications)

Node-cron (scheduled capsule unlocking)

OpenAI API

AI summaries

AI captions

Audio transcription (Whisper)

## 🔐 Authentication & Security

JWT-based authentication

Refresh token rotation

HttpOnly cookies for session security

Role-based and permission-based access

Capsule-level visibility enforcement

Media hidden until unlock

Secure AI execution on backend only

📦 Core Features
🕰️ Time Capsules

Create capsules with:

Text memories

Images

Audio

Video

Assign themes (life phases)

Add descriptions and metadata

## 🔓 Capsule Unlocking

Date-based unlock

Event-based unlock

Manual confirmation by owner

Automatic unlocking via background cron jobs

Countdown UI for locked capsules

## 👨‍👩‍👧 Collaboration & Sharing

Add collaborators (can contribute before unlock)

Add recipients (view-only after unlock)

Permission-aware access control

Owner-only editing before unlock

📨 Notifications

Email notifications to recipients

Unlock alerts

Scheduled full capsule email delivery

🎨 Theme Grouping

Capsules grouped by theme (e.g., College, Family, Career)

Dashboard overview (grouped view)

Dedicated theme pages for focused browsing

## 🤖 AI Memory Assistant

AI features are securely processed on the backend:

🧠 Memory summaries (from text content)

## ✨ Caption generation

🎧 Audio transcription (Whisper)

## Smart AI usage:

AI is only called if relevant media exists

Friendly empty states if content is missing

Results stored and reused when applicable

## 💬 Post-Unlock Interactions

Available only after unlock:

Reactions (Like, Love, Sad)

Comments

Personal reflections

These features turn capsules into shared emotional experiences rather than static storage.

## 🔐 Backend Overview

The backend is built using Node.js and Express with MongoDB as the primary database.
It provides secure authentication, media handling, scheduled background jobs,
AI-powered features, and strict access control.


## Architecture Diagram
Frontend (React)
   ↓
REST API (Express)
   ↓
Auth / Business Logic
   ↓
MongoDB (Data)
   ↓
Cloudinary (Media)
   ↓
Node-cron (Scheduled Jobs)
   ↓
OpenAI (AI Processing)


## 🔒 Security & Privacy

- JWT-based authentication with refresh token rotation
- HttpOnly cookies for session security
- Strict capsule visibility enforcement
- Media access only after unlock
- Permission-based collaboration controls


👤 Author

Built by: Swayam
A full-stack web developer passionate about scalable systems, meaningful UX, and AI-powered applications.

## 📜 License
This project is built for learning, demonstration, and hackathon purposes.