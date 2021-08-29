import type { NextApiResponse } from 'next';
import withAuth from '~/lib/auth';
import { NextIronRequest } from '~/lib/session';
import dbConnect from '~/lib/database';
import Redirect, { IRedirect } from '~/models/Redirect';

type Error = {
  success: false;
  error: {
    message: string;
  };
};

type Success = {
  success: true;
  data: IRedirect | IRedirect[];
};

type Response = Success | Error;

export default withAuth(async (req: NextIronRequest, res: NextApiResponse<Response>) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const redirects = await Redirect.find({}).sort({ created: 'asc' });
        res.status(200).json({ success: true, data: redirects });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    case 'POST':
      try {
        const redirect = await Redirect.create(req.body);
        res.status(201).json({ success: true, data: redirect });
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
