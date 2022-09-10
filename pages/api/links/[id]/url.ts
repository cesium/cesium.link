import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '~/lib/database';
import Link, { ILink } from '~/models/Link';

type Error = {
  error: {
    message: string;
  };
};

type Success = {
  url: string;
};

type Response = Success | Error;

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const {
    query: { id: slug },
    method
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const link: ILink = await Link.findOneAndUpdate(
          { slug },
          { $inc: { clicks: 1 } },
          { new: true }
        );

        if (!link) {
          return res.status(404).json({ error: { message: 'Link not found' } });
        }
        res.status(200).json({ url: link.url });
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: { message: error.message } });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: { message: `Method ${method} Not Allowed` } });
      break;
  }
};
