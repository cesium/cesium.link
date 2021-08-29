import type { NextApiResponse } from 'next';
import pick from 'lodash/pick';
import withAuth from '~/lib/auth';
import { NextIronRequest } from '~/lib/session';
import dbConnect from '~/lib/database';
import Account, { IAccount } from '~/models/Account';

type Error = {
  success: false;
  error: {
    message: string;
  };
};

type Success = {
  success: true;
  data: IAccount | IAccount[];
};

type Response = Success | Error;

export default withAuth(async (req: NextIronRequest, res: NextApiResponse<Response>) => {
  const currentUser = req.session.get('currentUser');

  if (!currentUser.admin) {
    return res.status(403).end();
  }

  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const accounts = await Account.find({}).select('-password').sort({ index: 'asc' });

        res.status(200).json({ success: true, data: accounts });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    case 'POST':
      try {
        const params = pick(req.body, ['name', 'email', 'password', 'admin']);

        const account = await Account.create(params);

        res.status(201).json({ success: true, data: account });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({
        success: false,
        error: { message: `Method ${method} Not Allowed` }
      });
      break;
  }
});
