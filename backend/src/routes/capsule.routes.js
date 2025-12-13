import { Router } from "express";
import { createCapsule,getMyCapsules } from "../controllers/capsule.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getCapsuleById } from "../controllers/capsule.controller.js";
import { unlockCapsuleByEvent } from "../controllers/capsule.controller.js";
const router = Router();

router.post(
  "/",
  verifyJWT,
  upload.array("media", 10),
  createCapsule
);
router.get("/", verifyJWT, getMyCapsules);
router.get("/:capsuleId", verifyJWT, getCapsuleById);

router.post(
  "/:capsuleId/unlock",
  verifyJWT,
  unlockCapsuleByEvent
);

export default router;
