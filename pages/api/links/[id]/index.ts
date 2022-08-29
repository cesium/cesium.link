import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '~/lib/database';
import Link, { ILink } from '~/models/Link';

type Error = {
  error: {
    message: string;
  };
};

type Success = { link: ILink };

type Response = Success | Error;

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const {
    query: { id },
    method
  } = req;

  if (Array.isArray(id)) {
    return res.status(400).json({ error: { message: "ID field can't be a list" } });
  }

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const link: ILink = await Link.findById(id);

        if (!link) {
          return res.status(404).json({ error: { message: 'Link not found' } });
        }
        res.status(200).json({ link: link });
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: { message: error.message } });
      }
      break;

    case 'PUT':
      try {
        const link: ILink = await Link.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!link) {
          return res.status(404).json({ error: { message: 'Link not found' } });
        }
        res.status(200).json({ link: link });
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: { message: error.message } });
      }
      break;

    case 'DELETE':
      try {
        const deleted = await Link.deleteOne({ _id: id });
        if (!deleted) {
          return res.status(400).json({ error: { message: 'Link could not be deleted' } });
        }
        res.status(204).end();
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: { message: error.message } });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({
        error: { message: `Method ${method} Not Allowed` }
      });
      break;
  }
});
