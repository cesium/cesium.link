import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import dbConnect from '~/lib/database';
import Link, { ILink } from '~/models/Link';

type Error = {
  success: false;
  error: {
    message: string;
  };
};

type Success = {
  success: true;
  data: ILink | ILink[];
};

type Response = Success | Error;

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { status } = query;

        if (status === 'archived') {
          const links = await Link.find({ $or: [{ archived: true }] }).sort({ index: 'asc' });
          res.status(200).json({ success: true, data: links });
        } else {
          const links = await Link.find({
            $or: [{ archived: false }, { archived: { $exists: false } }]
          }).sort({ index: 'asc' });
          res.status(200).json({ success: true, data: links });
        }
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    case 'POST':
      try {
        const link = await Link.create(req.body);
        res.status(201).json({ success: true, data: link });
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
