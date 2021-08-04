import mongoose, { Schema } from 'mongoose';

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
  return `${process.env.NEXT_PUBLIC_APP_URL}/f/${this.slug}`;
});

export default mongoose.models.Form || mongoose.model('Form', Form);
