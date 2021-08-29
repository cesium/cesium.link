import type { NextApiResponse } from 'next';
import withAuth from '~/lib/auth';
import { NextIronRequest } from '~/lib/session';
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

export default withAuth(async (req: NextIronRequest, res: NextApiResponse<Response>) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      const currentUser = req.session.get('currentUser');

      res.status(200).json({ success: true, data: currentUser });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({
        success: false,
        error: { message: `Method ${method} Not Allowed` }
      });
      break;
  }
});
