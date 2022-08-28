import mongoose, { Schema, Model } from 'mongoose';
import { APP_URL } from '~/lib/api';

export interface IForm {
  _id: string;
  name: string;
  slug: string;
  url: string;
  link: string;
  visits: number;
  created: Date;
  updated: Date;
}

const Form = new Schema<IForm>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true, required: true },
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

Form.virtual('link').get(function () {
  return `${APP_URL}/f/${this.slug}`;
});

export default (mongoose.models.Form as Model<IForm>) || mongoose.model('Form', Form);
