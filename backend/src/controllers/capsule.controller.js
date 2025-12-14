import Capsule from "../models/capsule.model.js";
import fs from "fs"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import {canViewCapsule} from "../utils/canViewCapsule.js";
import User from "../models/user.model.js";
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
    text,
  } = req.body;

  if (!title || !unlockType) {
    throw new ApiError(400, "Title and unlockType are required");
  }

  if (unlockType === "date" && !unlockDate) {
    throw new ApiError(400, "Unlock date is required");
  }

  if (unlockType === "event" && !unlockEvent) {
    throw new ApiError(400, "Unlock event is required");
  }

  const media = [];

  // ✅ text media
  if (text && text.trim()) {
    media.push({ type: "text", content: text.trim() });
  }

  // ✅ file media
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      let mediaType = "image";
      if (file.mimetype.startsWith("video")) mediaType = "video";
      else if (file.mimetype.startsWith("audio")) mediaType = "audio";

      const uploaded = await uploadToCloudinary(file.buffer);

      media.push({
        type: mediaType,
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
      });
    }
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
    media,
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
      // owner always sees own capsules
      { owner: userId },

      // collaborators only see capsules that are not private
      { collaborators: userId, privacy: { $in: ["shared", "public"] } },

      // recipients only see capsules that are not private
      { recipients: userEmail, privacy: { $in: ["shared", "public"] } }
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
    .populate("owner", "fullName email")
    .populate("collaborators", "fullName email");
    

  if (!capsule) {
    throw new ApiError(404, "Capsule not found");
  }

  // 🔐 Privacy enforcement
  if (!canViewCapsule(capsule, req.user)) {
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
          collaborators:capsule.collaborators,
          recipients:capsule.recipients,
          owner:capsule.owner,
          privacy:capsule.privacy,
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

const addCollaborator = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Collaborator email is required");
  }

  const capsule = await Capsule.findById(capsuleId);
  if (!capsule) {
    throw new ApiError(404, "Capsule not found");
  }

  // ✅ Only owner can add collaborators
  if (capsule.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only owner can add collaborators");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User with this email does not exist");
  }

  // ❌ Prevent self-add
  if (user._id.equals(capsule.owner)) {
    throw new ApiError(400, "Owner is already a collaborator");
  }

  // ❌ Prevent duplicates
  if (capsule.collaborators.some(id => id.equals(user._id))) {
    throw new ApiError(400, "User is already a collaborator");
  }

  capsule.collaborators.push(user._id);
  await capsule.save();
    await capsule.populate('collaborators', 'email fullName');
  return res.status(200).json(
    new ApiResponse(200, capsule.collaborators, "Collaborator added successfully")
  );
});

const removeCollaborator = asyncHandler(async (req, res) => {
  const { capsuleId, collaboratorId } = req.params;

  const capsule = await Capsule.findById(capsuleId);
  if (!capsule) throw new ApiError(404, "Capsule not found");

  if (capsule.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only owner can remove collaborators");
  }

  capsule.collaborators = capsule.collaborators.filter(
    (id) => id.toString() !== collaboratorId
  );

  await capsule.save();

  return res.status(200).json(
    new ApiResponse(200, capsule, "Collaborator removed successfully")
  );
});

const addRecipient = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Recipient email is required");
  }

  const capsule = await Capsule.findById(capsuleId);
  if (!capsule) {
    throw new ApiError(404, "Capsule not found");
  }

  // ✅ Only owner can add recipients
  if (capsule.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only owner can add recipients");
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  // ❌ Prevent duplicates
  if (capsule.recipients.includes(email.toLowerCase().trim())) {
    throw new ApiError(400, "Email is already a recipient");
  }

  capsule.recipients.push(email.toLowerCase().trim());
  await capsule.save();

  return res.status(200).json(
    new ApiResponse(200, capsule.recipients, "Recipient added successfully")
  );
});

const removeRecipient = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;
  const { email } = req.body; // Email in body, not params

  const capsule = await Capsule.findById(capsuleId);
  if (!capsule) throw new ApiError(404, "Capsule not found");

  if (capsule.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only owner can remove recipients");
  }

  capsule.recipients = capsule.recipients.filter(
    (recipientEmail) => recipientEmail !== email.toLowerCase().trim()
  );

  await capsule.save();

  return res.status(200).json(
    new ApiResponse(200, capsule.recipients, "Recipient removed successfully")
  );
});
const addMediaToCapsule = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;

  const capsule = await Capsule.findById(capsuleId);
  if (!capsule) throw new ApiError(404, "Capsule not found");

  const userId = req.user._id.toString();
  const isAllowed =
    capsule.owner.toString() === userId ||
    capsule.collaborators.some((id) => id.toString() === userId);

  if (!isAllowed) {
    throw new ApiError(403, "Not allowed to add media");
  }

  const media = [];

  if (req.body.text && req.body.text.trim()) {
    media.push({ type: "text", content: req.body.text.trim() });
  }

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      let mediaType = "image";
      if (file.mimetype.startsWith("video")) mediaType = "video";
      else if (file.mimetype.startsWith("audio")) mediaType = "audio";

      const uploaded = await uploadToCloudinary(file.buffer);

      media.push({
        type: mediaType,
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
      });
    }
  }

  capsule.media.push(...media);
  await capsule.save();

  return res
    .status(200)
    .json(new ApiResponse(200, capsule, "Media added successfully"));
});


const getCapsulesByTheme = asyncHandler(async (req, res) => {
  const { theme } = req.params;

  const capsules = await Capsule.find({
    owner: req.user._id,
    theme
  }).sort({ createdAt: -1 });
  

  return res.status(200).json(
    new ApiResponse(200, capsules, "Capsules fetched by theme")
  );
});

const getCapsulesGroupedByTheme = asyncHandler(async (req, res) => {
  const groupedCapsules = await Capsule.aggregate([
    {
      $match: {
        owner: req.user._id
      }
    },
    {
      $group: {
        _id: "$theme",
        capsules: {
          $push: {
            _id: "$_id",
            title: "$title",
            isUnlocked: "$isUnlocked",
            unlockDate: "$unlockDate",
            createdAt: "$createdAt"
          }
        }
      }
    },
    {
      $sort: {
        "_id": 1
      }
    }
  ]);

  return res.status(200).json(
    new ApiResponse(200, groupedCapsules, "Capsules grouped by theme")
  );
});

const updateCapsulePrivacy = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;
  const { privacy } = req.body;

  // allow all three
  if (!["private", "shared", "public"].includes(privacy)) {
    throw new ApiError(400, "Invalid privacy value");
  }

  const capsule = await Capsule.findById(capsuleId);

  if (!capsule) {
    throw new ApiError(404, "Capsule not found");
  }

  if (capsule.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only owner can change privacy");
  }

  capsule.privacy = privacy;
  await capsule.save();

  return res
    .status(200)
    .json(new ApiResponse(200, capsule, "Privacy updated successfully"));
});




export { createCapsule 
  ,getMyCapsules
  ,getCapsuleById,
  unlockCapsuleByEvent
  ,addCollaborator,
  removeCollaborator,
addMediaToCapsule,
getCapsulesByTheme,
getCapsulesGroupedByTheme,
updateCapsulePrivacy,
addRecipient,
removeRecipient
};
