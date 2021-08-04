import mongoose, { Schema } from 'mongoose';
import { nanoid } from 'nanoid';

export interface ILink {
  _id: string;
  title: string;
  url: string;
  emoji: string;
  attention: boolean;
  index: number;
  slug: string;
  link: string;
  clicks: number;
  created: Date;
}

const Link = new Schema<ILink>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    emoji: { type: String, required: true },
    attention: { type: Boolean, default: false },
    index: { type: Number, required: true, index: true },
    slug: { type: String, unique: true, index: true, required: true, default: () => nanoid(10) },
    clicks: { type: Number, default: 0 },
    created: { type: Date, default: Date.now }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

Link.virtual('link').get(function () {
  return `${process.env.NEXT_PUBLIC_APP_URL}/u/${this.slug}`;
});

export default mongoose.models.Link || mongoose.model('Link', Link);
