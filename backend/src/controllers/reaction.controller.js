import Reaction from "../models/reaction.model.js";
import Capsule from "../models/capsule.model.js";
import canInteract from "../utils/canInteract.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleReaction = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;
  const { type } = req.body;

  const capsule = await Capsule.findById(capsuleId);
  if (!capsule) throw new ApiError(404, "Capsule not found");

  if (!canInteract(capsule, req.user)) {
    throw new ApiError(403, "Interaction not allowed");
  }

  const existing = await Reaction.findOne({
    capsule: capsuleId,
    user: req.user._id
  });

  if (existing) {
    await existing.deleteOne();
    return res.json(new ApiResponse(200, null, "Reaction removed"));
  }

  const reaction = await Reaction.create({
    capsule: capsuleId,
    user: req.user._id,
    type
  });

  res.json(new ApiResponse(200, reaction, "Reaction added"));
});

export { toggleReaction };
