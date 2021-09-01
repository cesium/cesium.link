import mongoose, { Schema } from 'mongoose';
import { nanoid } from 'nanoid';
import { APP_URL }from '~/lib/api';

export interface IRedirect {
  _id: string;
  name: string;
  slug: string;
  url: string;
  link: string;
  visits: number;
  created: Date;
  updated: Date;
}

const Redirect = new Schema<IRedirect>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true, required: true, default: () => nanoid(5) },
    url: { type: String, required: true },
    visits: { type: Number, default: 0 },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

Redirect.virtual('link').get(function () {
  return `${APP_URL}/r/${this.slug}`;
});

export default mongoose.models.Redirect || mongoose.model('Redirect', Redirect);
