import { Router } from "express";
import { createCapsule,getMyCapsules } from "../controllers/capsule.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createCapsule);
router.get("/", verifyJWT, getMyCapsules);

export default router;
