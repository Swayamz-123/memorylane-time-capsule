import Capsule from "../models/capsule.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createCapsule = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    theme,
    unlockType,
    unlockDate,
    unlockEvent,
    recipients,
    privacy,
    media
  } = req.body;

  if (!title || !unlockType) {
    throw new ApiError(400, "Title and unlock type are required");
  }

  if (unlockType === "date" && !unlockDate) {
    throw new ApiError(400, "Unlock date is required");
  }

  if (unlockType === "event" && !unlockEvent) {
    throw new ApiError(400, "Unlock event is required");
  }

  const capsule = await Capsule.create({
    title,
    description,
    owner: req.user._id,
    theme,
    unlockType,
    unlockDate,
    unlockEvent,
    recipients,
    privacy,
    media
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        capsule,
        "Time capsule created successfully"
      )
    );
});

export { createCapsule };
