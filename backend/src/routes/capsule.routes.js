import { Router } from "express";
import { createCapsule } from "../controllers/capsule.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createCapsule);

export default router;
