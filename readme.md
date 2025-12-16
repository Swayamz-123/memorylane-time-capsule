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

Resend Email

External cron(to keep calling cron route)

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

#SCREENSHOT
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0a51f67c-4684-4671-8777-189bd6ff3710" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/db0cd81c-182a-499f-9637-42a0a479d333" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e88fd496-b4ed-4d44-bac1-4456f087cf91" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4d66d5e0-dbd2-41bd-96d9-e165c528ad65" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/29738fe9-444c-40ed-918e-179f08034328" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bc755154-af2e-4a62-bb2c-b46c93e2f035" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/89ee67d7-cf9f-446d-83f5-0285432096bd" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2cc4aa47-2ae9-48f2-a16e-95b7a619865e" />

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

## Routes
### Capsule Routes
POST    /api/v1/capsules -> To add capsule
GET     /api/v1/capsules   -> To get my capsule
GET     /api/v1/capsules/:capsuleId -> To get a particular capsule
POST    /api/v1/capsules/:capsuleId/unlock -> To manually unlock on basis of event

POST    /api/v1/capsules/:capsuleId/collaborators -> To add collaborators
DELETE  /api/v1/capsules/:capsuleId/collaborators/:collaboratorId  -> To remove collaborators

POST    /api/v1/capsules/:capsuleId/recipients  -> To add Recipients

DELETE  /api/v1/capsules/:capsuleId/recipients  -> To remoove Recipients

POST    /api/v1/capsules/:capsuleId/media  -> To add media

GET     /api/v1/capsules/theme/:theme  -> To get capsule by particular theme

GET     /api/v1/capsules/grouped/themes -> To group capsule on basis of theme

GET     /api/v1/capsules/:capsuleId/ai   -> To get ai response

GET     /api/v1/capsules/:capsuleId/reactions  -> To get reactions upon capsule

POST    /api/v1/capsules/:capsuleId/reactions  ->To  react upon capsule

GET     /api/v1/capsules/:capsuleId/reflections -> To get reactions upon capsule

POST    /api/v1/capsules/:capsuleId/reflections  ->To  react upon capsule

GET     /api/v1/capsules/:capsuleId/comments  -> To get reactions upon capsule

POST    /api/v1/capsules/:capsuleId/comments   ->To  react upon capsule

PATCH   /api/v1/capsules/:capsuleId/privacy   -> To toggle the privacy

### User Routes
POST    /api/v1/users/register  ->  To register User

POST    /api/v1/users/login  -> To login User

POST    /api/v1/users/logout   -> To logout User

POST    /api/v1/users/refresh-token  -> To refresh access token

GET     /api/v1/users/current-user -> To get current user

### Cron Routes
GET     /api/v1/cron/unlock-capsules  -> To unlcok the capsule

## 🔒 Security & Privacy

- JWT-based authentication with refresh token rotation
- HttpOnly cookies for session security
- Strict capsule visibility enforcement
- Media access only after unlock
- Permission-based collaboration controls

⚙️ Environment Variables
Backend (.env)
PORT=8000
MONGODB_URI=your_mongodb_url
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=your_access_secret
REFRESH_TOKKEN_EXPIRY=your_refresh_secret
NODE_ENV=production/developement
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_ClOUD_KEY=xxxx
CLOUDINARY_CLOUD_SECRET=xxxx
CRON_SECRET=
RESEND_API_KEY=xxxx
OPENAI_API_KEY=xxxx
DOMAIN=xxx
CORS_ORIGIN=https://memorylane-time-capsule.vercel.app

Frontend (.env)
VITE_API_BASE_URL=https://your-backend-url/api/v1


🧑‍💻 Local Development Setup
1️⃣ Clone the Repository
git clone https://github.com/swayamz-123/memorylanetime-capsule.git
cd memorylane

2️⃣ Backend Setup
cd backend
npm install
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


⚠️ Important Cron Instruction

Difference between current time and unlock time should be at least 10 minutes
to allow cron jobs to execute properly,asa I have cuurently set it to 10 minutes,if you want no delay then can be set it to 1 minute.
Check all the features of the deployed website , sometimes email service may not work because i have used free render service , it will work on localhost and paid service
For local cloning you can replace external cron with node-cron 

Example:
Current time: 11:56 AM
Unlock time: 12:06 PM (same date) 


👤 Author
Built by: Swayam
A full-stack web developer passionate about scalable systems, meaningful UX, and AI-powered applications.

📜 License
This project is built for learning, demonstration, and hackathon purposes.


