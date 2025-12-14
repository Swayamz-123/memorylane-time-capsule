import { Router } from "express";
import { createCapsule,getMyCapsules } from "../controllers/capsule.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getCapsuleById } from "../controllers/capsule.controller.js";
import { unlockCapsuleByEvent } from "../controllers/capsule.controller.js";
import { addCollaborator ,removeCollaborator,addMediaToCapsule} from "../controllers/capsule.controller.js";
import { getCapsulesByTheme,getCapsulesGroupedByTheme,updateCapsulePrivacy } from "../controllers/capsule.controller.js";
import { addComment,getComments } from "../controllers/comment.controller.js";
import { addReflection ,getReflections} from "../controllers/reflection.controller.js";
import { toggleReaction ,getReactions} from "../controllers/reaction.controller.js";
import { generateAIResult } from "../controllers/ai.controller.js";
import { addRecipient } from "../controllers/capsule.controller.js";
import { removeRecipient } from "../controllers/capsule.controller.js";
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

router.post(
  
  "/:capsuleId/collaborators",
  verifyJWT,
  addCollaborator
);

router.delete(
  "/:capsuleId/collaborators/:collaboratorId",
  verifyJWT,
  removeCollaborator
);
router.post(
  "/:capsuleId/recipients",
  verifyJWT,
  addRecipient
);


router.delete(
  "/:capsuleId/recipients",
  verifyJWT,
  removeRecipient
);
router.post(
  "/:capsuleId/media",
  verifyJWT,
  upload.array("media", 10),
  addMediaToCapsule
);

router.get(
  "/theme/:theme",
  verifyJWT,
  getCapsulesByTheme
);


router.get(
  "/grouped/themes",
  verifyJWT,
  getCapsulesGroupedByTheme
);


router.get(
  "/:capsuleId/ai",
   verifyJWT,
    generateAIResult);
router.get("/:capsuleId/reactions", verifyJWT, getReactions);
router.post("/:capsuleId/reactions", verifyJWT, toggleReaction);

router.get("/:capsuleId/reflections", verifyJWT, getReflections);
router.post("/:capsuleId/reflections", verifyJWT, addReflection);

router.get("/:capsuleId/comments", verifyJWT, getComments);
router.post("/:capsuleId/comments", verifyJWT, addComment);
router.patch(
  "/:capsuleId/privacy",
  verifyJWT,
  updateCapsulePrivacy
);


export default router;
