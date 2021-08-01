import mongoose, { Schema } from 'mongoose';
import { nanoid } from 'nanoid';

const Redirect = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, index: true, required: true, default: () => nanoid(5) },
  url: { type: String, required: true },
  visits: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

export default mongoose.models.Redirect || mongoose.model('Redirect', Redirect);
