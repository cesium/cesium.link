import withSession, { NextIronHandler } from './session';
import dbConnect from '~/lib/database';
import Account, { IAccount } from '~/models/Account';

export interface LoginParams {
  email: string;
  password: string;
}

/**
 * @returns Account if password is valid, null otherwise.
 * @throws Error if email or password is missing.
 */
export async function login({ email, password }: LoginParams): Promise<IAccount> {
  if (!email || !password) {
    throw new Error('Email and password required');
  }

  await dbConnect();

  const user = await Account.findOne({ email });

  if (!user) return null;

  if (await user.verifyPassword(password)) {
    const { password, ...data } = user.toObject();

    return data;
  }

  return null;
}

export default function withAuth(handler: NextIronHandler) {
  return withSession(async (req, res) => {
    const auth = req.session.get('auth');

    if (!auth || !auth.id) {
      return res.status(401).end();
    }

    await dbConnect();

    const user = await Account.findById(auth.id);

    if (!user) {
      return res.status(401).end();
    }

    const { password, ...data } = user.toObject();

    req.session.set('currentUser', data);

    return handler(req, res);
  });
}
