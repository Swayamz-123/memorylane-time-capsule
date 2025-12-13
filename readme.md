## 🔐 Backend Overview

The backend is built using Node.js and Express with MongoDB as the primary database.
It provides secure authentication, media handling, scheduled background jobs,
AI-powered features, and strict access control.

## 🛠️ Backend Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication (Access + Refresh Tokens)
- bcrypt (password hashing)
- Cloudinary (media storage)
- Multer (file uploads)
- Nodemailer (email notifications)
- Node-cron (scheduled capsule unlocking)
- OpenAI (AI summaries, captions & audio transcription)
- Axios (audio streaming for transcription)

## ✅ Feature Implementation

### Required Features
✔ Create digital time capsules (text, image, audio, video)  
✔ Unlock capsules by future date or life event  
✔ Recipient assignment & notification  
✔ Email alerts on unlock  
✔ Themed memory grouping  
✔ Collaboration between family members  
✔ Countdown timer for unlock  

### Optional / Advanced Features
✔ AI Memory Assistant (summary & caption generation)  
✔ Audio transcription using OpenAI Whisper  
✔ Scheduled full capsule email delivery  
✔ Post-unlock interactions (comments & reactions)  
✔ Strict privacy controls (private / shared access)


## 🏗️ Architecture

Frontend communicates with a RESTful Express backend which handles authentication,
business logic, media uploads, AI processing, and background jobs. Media is stored
on Cloudinary, emails are sent via Nodemailer, and AI features are powered by OpenAI.


## 🔒 Security & Privacy

- JWT-based authentication with refresh token rotation
- HttpOnly cookies for session security
- Strict capsule visibility enforcement
- Media access only after unlock
- Permission-based collaboration controls
