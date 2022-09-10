import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '~/lib/database';
import Link, { ILink } from '~/models/Link';

type Error = {
  error: {
    message: string;
  };
};

type Success = { link: ILink } | { data: ILink[] };

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
          res.status(200).json({ data: links });
        } else {
          const links = await Link.find({
            $or: [{ archived: false }, { archived: { $exists: false } }]
          }).sort({ index: 'asc' });
          res.status(200).json({ data: links });
        }
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: { message: error.message } });
      }
      break;
    case 'POST':
      try {
        const link = await Link.create(req.body);
        res.status(201).json({ link: link });
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: { message: error.message } });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: { message: `Method ${method} Not Allowed` } });
      break;
  }
});
