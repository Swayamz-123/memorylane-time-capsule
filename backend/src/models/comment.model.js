import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
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
    text: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
