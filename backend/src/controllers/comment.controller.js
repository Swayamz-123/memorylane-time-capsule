import Comment from "../models/comment.model.js";
import Capsule from "../models/capsule.model.js";
import canInteract from "../utils/canInteract.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addComment = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;
  const { text } = req.body;

  const capsule = await Capsule.findById(capsuleId);
  if (!capsule) throw new ApiError(404, "Capsule not found");

  if (!canInteract(capsule, req.user)) {
    throw new ApiError(403, "Interaction not allowed");
  }

  const comment = await Comment.create({
    capsule: capsuleId,
    user: req.user._id,
    text
  });

  res.status(201).json(
    new ApiResponse(201, comment, "Comment added")
  );
});

// comment.controller.js
const getComments = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;

  const capsule = await Capsule.findById(capsuleId);
  if (!capsule) throw new ApiError(404, "Capsule not found");

  if (!canInteract(capsule, req.user)) {
    throw new ApiError(403, "Interaction not allowed");
  }

  const comments = await Comment
    .find({ capsule: capsuleId })
    .sort({ createdAt: -1 })
    .populate("user", "name email");

  res.json(new ApiResponse(200, comments, "Comments fetched"));
});



export { addComment ,getComments};
