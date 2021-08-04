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
  data?: ILink;
};

type Response = Success | Error;

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const {
    query: { id },
    method
  } = req;

  if (Array.isArray(id)) {
    return res.status(400).json({ success: false, error: { message: "ID field can't be a list" } });
  }

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const link: ILink = await Link.findById(id);

        if (!link) {
          return res.status(404).json({ success: false, error: { message: 'Link not found' } });
        }
        res.status(200).json({ success: true, data: link });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;

    case 'PUT':
      try {
        const link: ILink = await Link.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!link) {
          return res.status(404).json({ success: false, error: { message: 'Link not found' } });
        }
        res.status(200).json({ success: true, data: link });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;

    case 'DELETE':
      try {
        const deleted = await Link.deleteOne({ _id: id });
        if (!deleted) {
          return res
            .status(400)
            .json({ success: false, error: { message: 'Link could not be deleted' } });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({
        success: false,
        error: { message: `Method ${method} Not Allowed` }
      });
      break;
  }
});
