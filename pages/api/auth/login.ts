import type { NextApiResponse } from 'next';
import withSession, { NextIronRequest } from '~/lib/session';
import { login } from '~/lib/auth';
import dbConnect from '~/lib/database';
import { IAccount } from '~/models/Account';

type Error = {
  success: false;
  error: {
    message: string;
  };
};

type Success = {
  success: true;
  data?: IAccount;
};

type Response = Success | Error;

export default withSession(async (req: NextIronRequest, res: NextApiResponse<Response>) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const user = await login(req.body);

        if (!user) {
          res.status(404).json({ success: false, error: { message: 'Not found' } });
          return;
        }

        req.session.set('auth', { id: user._id });
        await req.session.save();

        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).json({
        success: false,
        error: { message: `Method ${method} Not Allowed` }
      });
      break;
  }
});
