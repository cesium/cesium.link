import mongoose, { Schema } from 'mongoose';

const Form = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, index: true, required: true },
  url: { type: String, required: true },
  visits: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

export default mongoose.models.Form || mongoose.model('Form', Form);
