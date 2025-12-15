import express from "express";
import { unlockCapsulesCron } from "../controllers/cron.controller.js";

const router = express.Router();

router.get("/unlock-capsules", unlockCapsulesCron);

export default router;
