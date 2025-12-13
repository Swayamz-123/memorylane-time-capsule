import cron from "node-cron";
import Capsule from "../models/capsule.model.js";
import sendEmail from "../utils/sendEmail.js";

const unlockCapsulesJob = () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const now = new Date();

      const capsulesToUnlock = await Capsule.find({
        unlockType: "date",
        unlockDate: { $lte: now },
        isUnlocked: false
      }).populate("owner", "email fullName");

      for (const capsule of capsulesToUnlock) {
        capsule.isUnlocked = true;
        await capsule.save();

        const emails = [
          capsule.owner.email,
          ...(capsule.recipients || [])
        ];

        const subject = `🔓 Your Time Capsule "${capsule.title}" is Unlocked`;
        const text = `
Hi,

Your time capsule "${capsule.title}" has just been unlocked 🎉

Log in to MemoryLane to view your memories.

— MemoryLane Team
        `;

        for (const email of emails) {
          await sendEmail({ to: email, subject, text });
        }
      }

      if (capsulesToUnlock.length > 0) {
        console.log(`📧 Emails sent for ${capsulesToUnlock.length} unlocked capsule(s)`);
      }
    } catch (error) {
      console.error("❌ Unlock email job failed:", error);
    }
  });
};

export default unlockCapsulesJob;
