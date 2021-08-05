import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
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
  data?: IRedirect;
};

type Response = Success | Error;

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const {
    query: { slug },
    method
  } = req;

  if (Array.isArray(slug)) {
    return res
      .status(400)
      .json({ success: false, error: { message: "Slug field can't be a list" } });
  }

  if (!slug) {
    return res.status(400).json({ success: false, error: { message: 'Slug field is mandatory' } });
  }

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const redirect: IRedirect = await Redirect.findOne({ slug });

        if (!redirect) {
          return res.status(404).json({ success: false, error: { message: 'Redirect not found' } });
        }
        res.status(200).json({ success: true, data: redirect });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;

    case 'PUT':
      try {
        const redirect: IRedirect = await Redirect.findOneAndUpdate(
          { slug },
          { ...req.body, updated: Date.now() },
          {
            new: true,
            runValidators: true
          }
        );
        if (!redirect) {
          return res.status(404).json({ success: false, error: { message: 'Redirect not found' } });
        }
        res.status(200).json({ success: true, data: redirect });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;

    case 'DELETE':
      try {
        const deleted = await Redirect.deleteOne({ slug });
        if (!deleted) {
          return res
            .status(400)
            .json({ success: false, error: { message: 'Form could not be deleted' } });
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
