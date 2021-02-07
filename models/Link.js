import mongoose, { Schema } from "mongoose";

const Link = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  url: { type: String, required: true },
  emoji: { type: String, required: false },
  atention: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});

export default mongoose.models.Link || mongoose.model("Link", Link);
