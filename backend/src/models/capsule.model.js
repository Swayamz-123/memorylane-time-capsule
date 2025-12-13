import mongoose, { Schema } from "mongoose";

const mediaSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["text", "image", "video", "audio"],
      required: true
    },
    content: String,
    url: String,
    publicId: String
  },
  { _id: false }
);

const capsuleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    theme: {
      type: String,
      enum: ["childhood", "family", "college", "career", "other"],
      default: "other"
    },

    unlockType: {
      type: String,
      enum: ["date", "event"],
      required: true
    },

    unlockDate: Date,

    unlockEvent: String,

    isUnlocked: {
      type: Boolean,
      default: false
    },

    recipients: [
      {
        type: String,
        lowercase: true,
        trim: true
      }
    ],

    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    privacy: {
      type: String,
      enum: ["private", "shared","public"],
      default: "private"
    },

    media: [mediaSchema]
  },
  {
    timestamps: true
  }
);

const Capsule = mongoose.model("Capsule", capsuleSchema);
export default Capsule;
