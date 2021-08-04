import type { NextApiRequest, NextApiResponse } from 'next';
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
  data: string;
};

type Response = Success | Error;

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const {
    query: { slug },
    method
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const redirect: IRedirect = await Redirect.findOneAndUpdate(
          { slug },
          { $inc: { visits: 1 } },
          { new: true }
        );

        if (!redirect) {
          return res.status(404).json({ success: false, error: { message: 'Redirect not found' } });
        }
        res.status(200).json({ success: true, data: redirect.url });
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
