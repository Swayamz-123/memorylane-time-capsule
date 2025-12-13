import Capsule from "../models/capsule.model.js";
import AIResult from "../models/aiResult.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateCaption,generateSummary } from "../utils/aiText.service.js";
import { transcribeAudioFromUrl } from "../utils/audioTranscription.service.js";

const generateAIResult = asyncHandler(async (req, res) => {
  const { capsuleId } = req.params;
  const { type } = req.query;

  if (!["summary", "caption", "transcript"].includes(type)) {
    throw new ApiError(400, "Invalid AI type");
  }

  const capsule = await Capsule.findById(capsuleId);

  if (!capsule) throw new ApiError(404, "Capsule not found");
  if (!capsule.isUnlocked)
    throw new ApiError(403, "Capsule must be unlocked");

  const cached = await AIResult.findOne({ capsule: capsuleId, type });
  if (cached) {
    return res.status(200).json(
      new ApiResponse(200, cached, "AI result fetched from cache")
    );
  }

  let content = "";

  if (type === "transcript") {
    const audio = capsule.media.find(m => m.type === "audio");
    if (!audio?.url) {
      throw new ApiError(400, "No audio memory available");
    }
    content = await transcribeAudioFromUrl(audio.url);
  } else {
    const textMedia = capsule.media
      .filter(m => m.type === "text")
      .map(m => m.content)
      .join("\n");

    if (!textMedia) {
      throw new ApiError(400, "No text memory available");
    }

    content =
      type === "summary"
        ? await generateSummary(textMedia)
        : await generateCaption(textMedia);
  }

  const aiResult = await AIResult.create({
    capsule: capsuleId,
    type,
    content,
    generatedBy: req.user._id
  });

  res.status(200).json(
    new ApiResponse(200, aiResult, "AI result generated successfully")
  );
});

export { generateAIResult };
