import mongoose, { Model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';

import { APP_URL } from '~/lib/api';

export interface ILink {
  id: string;
  title: string;
  url: string;
  emoji: string;
  attention: boolean;
  index: number;
  slug: string;
  link: string;
  clicks: number;
  archived: boolean;
  created: Date;
  updated: Date;
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
    archived: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

Link.virtual('link').get(function () {
  return `${APP_URL}/u/${this.slug}`;
});

export default (mongoose.models.Link as Model<ILink>) || mongoose.model('Link', Link);
