import Reflection from "../models/reflection.model.js";
import Capsule from "../models/capsule.model.js";
import canInteract from "../utils/canInteract.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addReflection = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;
  const { content } = req.body;

  const capsule = await Capsule.findById(capsuleId);
  if (!capsule) throw new ApiError(404, "Capsule not found");

  if (!canInteract(capsule, req.user)) {
    throw new ApiError(403, "Interaction not allowed");
  }

  const reflection = await Reflection.create({
    capsule: capsuleId,
    user: req.user._id,
    content
  });

  res.status(201).json(
    new ApiResponse(201, reflection, "Reflection added")
  );
});
// reflection.controller.js
const getReflections = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;

  const capsule = await Capsule.findById(capsuleId);
  if (!capsule) throw new ApiError(404, "Capsule not found");

  if (!canInteract(capsule, req.user)) {
    throw new ApiError(403, "Interaction not allowed");
  }

  const reflections = await Reflection
    .find({ capsule: capsuleId })
    .sort({ createdAt: -1 })
    .populate("user", "name email");

  res.json(new ApiResponse(200, reflections, "Reflections fetched"));
});

export { addReflection, getReflections };



