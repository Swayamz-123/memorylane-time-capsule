
import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import userRouter from './routes/user.routes.js'
import capsuleRoutes from "./routes/capsule.routes.js";
import sendEmail from "./utils/sendEmail.js";
import cronRoutes from "./routes/cron.routes.js";

const app = express()    
app.use(cors({
  origin:process.env.CORS_ORIGIN, 
  credentials:true, 
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true ,limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use("/api/v1/users",userRouter)
app.use("/api/v1/capsules", capsuleRoutes);
app.use("/api/v1/cron", cronRoutes);
app.post('/api/test-email', async (req, res) => {
  try {
    await sendEmail({
      to: 'itzswayam890@gmail.com',
      subject: 'Test from Render',
      text: 'If you see this, email works!',
      html: "<h2>Email service is working 🚀</h2>"
    });
    res.json({ success: true });
  } catch (e) {
    res.json({ error: e.message });
  }
});

export {app}