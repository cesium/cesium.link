import argon2 from 'argon2';
import mongoose, { Schema } from 'mongoose';

export interface IAccount {
  _id: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  created: Date;
  updated: Date;
}

const Account = new Schema<IAccount>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

Account.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await argon2.hash(this.password);
  }
  return next();
});

Account.methods.verifyPassword = async function (password) {
  return argon2.verify(this.password, password);
};

export default mongoose.models.Account || mongoose.model('Account', Account);
