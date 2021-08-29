import type { NextApiRequest, NextApiResponse } from 'next';
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
  data: string;
};

type Response = Success | Error;

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const {
    query: { id: slug },
    method
  } = req;

  if (Array.isArray(slug)) {
    return res
      .status(400)
      .json({ success: false, error: { message: "Slug field can't be a list" } });
  }

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
          return res.status(404).json({ success: false, error: { message: 'Link not found' } });
        }
        res.status(200).json({ success: true, data: link.url });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({
        success: false,
        error: { message: `Method ${method} Not Allowed` }
      });
      break;
  }
};
