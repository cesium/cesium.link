import mongoose, { Schema } from 'mongoose';

const Link = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  emoji: { type: String, required: false },
  attention: { type: Boolean, default: false },
  index: { type: Number, required: true, index: true },
  created: { type: Date, default: Date.now }
});

export default mongoose.models.Link || mongoose.model('Link', Link);
