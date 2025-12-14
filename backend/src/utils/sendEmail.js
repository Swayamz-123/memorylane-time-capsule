import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, html }) => {
  console.log("📧 Sending to:", to, "Subject:", subject.slice(0, 30));
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    tls: {
      rejectUnauthorized: false // Render SSL fix
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const result = await transporter.sendMail({
      from: `"MemoryLane" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });
    console.log("✅ EMAIL SENT:", result.messageId);
    return result;
  } catch (error) {
    console.error("❌ EMAIL ERROR:", {
      code: error.code,
      message: error.message,
      response: error.response?.message
    });
    throw error;
  }
};

export default sendEmail;
