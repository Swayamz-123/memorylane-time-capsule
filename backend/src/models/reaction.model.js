import mongoose, { Schema } from "mongoose";

const reactionSchema = new Schema(
  {
    capsule: {
      type: Schema.Types.ObjectId,
      ref: "Capsule",
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["like", "love", "sad"],
      required: true
    }
  },
  { timestamps: true }
);

reactionSchema.index({ capsule: 1, user: 1 }, { unique: true });

export default mongoose.model("Reaction", reactionSchema);
