import Capsule from "../models/capsule.model.js";
import fs from "fs"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
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
    text
  } = req.body;

  if (!title || !unlockType) {
    throw new ApiError(400, "Title and unlockType are required");
  }

  if (unlockType === "date" && !unlockDate) {
    throw new ApiError(400, "Unlock date is required for date-based capsules");
  }

  if (unlockType === "event" && !unlockEvent) {
    throw new ApiError(400, "Unlock event is required for event-based capsules");
  }

  const media = [];

  // ✅ TEXT MEMORY
  if (text && text.trim() !== "") {
    media.push({
      type: "text",
      content: text.trim()
    });
  }

  // ✅ FILE MEDIA (IMAGE / AUDIO / VIDEO)
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      let mediaType = "image";

      if (file.mimetype.startsWith("video")) mediaType = "video";
      else if (file.mimetype.startsWith("audio")) mediaType = "audio";

      const uploaded = await uploadToCloudinary(file.path, mediaType);

      media.push({
        type: mediaType,
        url: uploaded.secure_url,
        publicId: uploaded.public_id
      });

     fs.promises.unlink(file.path).catch(() => {});
    }
  }

  if (media.length === 0) {
    throw new ApiError(400, "At least one memory (text or media) is required");
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
    .json(new ApiResponse(201, capsule, "Time capsule created successfully"));
});

const getMyCapsules = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userEmail = req.user.email;

  const capsules = await Capsule.find({
    $or: [
      { owner: userId },
      { collaborators: userId },
      { recipients: userEmail }
    ]
  })
    .populate("owner", "fullName email")
    .sort({ createdAt: -1 });

  const now = new Date();

  const result = capsules.map((capsule) => {
    let isUnlocked = capsule.isUnlocked;

    if (
      capsule.unlockType === "date" &&
      capsule.unlockDate &&
      capsule.unlockDate <= now
    ) {
      isUnlocked = true;
    }

    const countdown =
      capsule.unlockType === "date" && capsule.unlockDate && !isUnlocked
        ? capsule.unlockDate.getTime() - now.getTime()
        : null;

    return {
      ...capsule.toObject(),
      isUnlocked,
      countdown
    };
  });

  return res.status(200).json(
    new ApiResponse(200, result, "My capsules fetched successfully")
  );
});

const getCapsuleById = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;

  const capsule = await Capsule.findById(capsuleId)
    .populate("owner", "fullName email");

  if (!capsule) {
    throw new ApiError(404, "Capsule not found");
  }

  const userId = req.user._id.toString();
  const userEmail = req.user.email;

  const isOwner = capsule.owner._id.toString() === userId;
  const isCollaborator = capsule.collaborators.some(
    (id) => id.toString() === userId
  );
  const isRecipient = capsule.recipients.includes(userEmail);

  if (!isOwner && !isCollaborator && !isRecipient) {
    throw new ApiError(403, "You are not allowed to view this capsule");
  }

  // 🔒 Locked capsule → hide media
  if (!capsule.isUnlocked) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          _id: capsule._id,
          title: capsule.title,
          description: capsule.description,
          theme: capsule.theme,
          unlockType: capsule.unlockType,
          unlockDate: capsule.unlockDate,
          unlockEvent: capsule.unlockEvent,
          isUnlocked: false
        },
        "Capsule is locked"
      )
    );
  }

  // 🔓 Unlocked → full capsule
  return res.status(200).json(
    new ApiResponse(200, capsule, "Capsule fetched successfully")
  );
});

const unlockCapsuleByEvent = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;

  const capsule = await Capsule.findById(capsuleId);

  if (!capsule) {
    throw new ApiError(404, "Capsule not found");
  }

  if (capsule.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only owner can unlock this capsule");
  }

  if (capsule.unlockType !== "event") {
    throw new ApiError(400, "This capsule is not event-based");
  }

  if (capsule.isUnlocked) {
    throw new ApiError(400, "Capsule is already unlocked");
  }

  capsule.isUnlocked = true;
  await capsule.save();

  return res.status(200).json(
    new ApiResponse(200, capsule, "Capsule unlocked successfully")
  );
});


export { createCapsule ,getMyCapsules,getCapsuleById,unlockCapsuleByEvent};
