import Capsule from "../models/capsule.model.js";
import sendEmail from "../utils/sendEmail.js";
import buildCapsuleEmailHTML from "../utils/capsuleEmailTemplate.js";

export const unlockCapsulesCron = async (req, res) => {
  try {
    // 🔐 Protect endpoint
    if (req.headers["x-cron-secret"] !== process.env.CRON_SECRET) {
      return res.status(401).json({ message: "Unauthorized cron call" });
    }

    const now = new Date();

    const capsules = await Capsule.find({
      unlockType: "date",
      unlockDate: { $lte: now },
      isUnlocked: false,
    }).populate("owner", "email fullName");

    for (const capsule of capsules) {
      capsule.isUnlocked = true;
      await capsule.save();

      const emails = [
        capsule.owner.email,
        ...(capsule.recipients || []),
      ];

      const subject = `🔓 Your Time Capsule "${capsule.title}" is Unlocked`;
      const html = buildCapsuleEmailHTML(capsule);
      const text = `Your time capsule "${capsule.title}" has unlocked.`;

      for (const email of emails) {
        await sendEmail({ to: email, subject, text, html });
        await new Promise(r => setTimeout(r, 1500)); // rate-safe
      }
    }

    return res.json({
      success: true,
      processed: capsules.length,
    });
  } catch (err) {
    console.error("Cron error:", err);
    return res.status(500).json({ message: "Cron failed" });
  }
};
