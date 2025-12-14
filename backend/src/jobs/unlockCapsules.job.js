import cron from "node-cron";
import Capsule from "../models/capsule.model.js";
import sendEmail from "../utils/sendEmail.js";
import buildCapsuleEmailHTML from "../utils/capsuleEmailTemplate.js";

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

        const html = buildCapsuleEmailHTML(capsule);

        const text = `Your time capsule "${capsule.title}" has unlocked. Please open MemoryLane to view it.`;

        for (const email of emails) {
          await sendEmail({
            to: email,
            subject,
            text,
            html
          });
        }
      }

     
    } catch (error) {
     //error
    }
  });
};

export default unlockCapsulesJob;
