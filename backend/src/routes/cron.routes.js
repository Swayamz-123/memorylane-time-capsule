import express from "express";
import { unlockCapsulesCron } from "../controllers/cron.controller.js";

const router = express.Router();

router.post("/unlock-capsules", unlockCapsulesCron);

export default router;
