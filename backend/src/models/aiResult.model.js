import mongoose, { Schema } from "mongoose";

const aiResultSchema = new Schema(
  {
    capsule: {
      type: Schema.Types.ObjectId,
      ref: "Capsule",
      required: true
    },

    type: {
      type: String,
      enum: ["summary", "caption", "transcript"],
      required: true
    },

    content: {
      type: String,
      required: true
    },

    generatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const AIResult = mongoose.model("AIResult", aiResultSchema);
export default AIResult;
