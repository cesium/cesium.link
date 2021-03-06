import mongoose, { Schema } from 'mongoose';
import { nanoid } from 'nanoid';

const Link = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  emoji: { type: String, required: false },
  attention: { type: Boolean, default: false },
  index: { type: Number, required: true, index: true },
  slug: { type: String, unique: true, index: true, required: true, default: () => nanoid(10) },
  clicks: { type: Number, default: 0 },
  created: { type: Date, default: Date.now }
});

export default mongoose.models.Link || mongoose.model('Link', Link);
