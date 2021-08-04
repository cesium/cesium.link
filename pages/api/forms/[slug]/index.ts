import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import dbConnect from '~/lib/database';
import Form, { IForm } from '~/models/Form';

type Error = {
  success: false;
  error: {
    message: string;
  };
};

type Success = {
  success: true;
  data?: IForm;
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

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const form = await Form.findOne({ slug });

        if (!form) {
          return res.status(404).json({ success: false, error: { message: 'Form not found' } });
        }
        res.status(200).json({ success: true, data: form });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;

    case 'PUT':
      try {
        const form: IForm = await Form.findOneAndUpdate(
          { slug },
          { ...req.body, updated: Date.now() },
          {
            new: true,
            runValidators: true
          }
        );

        if (!form) {
          return res.status(404).json({ success: false, error: { message: 'Form not found' } });
        }
        res.status(200).json({ success: true, data: form });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;

    case 'DELETE':
      try {
        const deleted = await Form.deleteOne({ slug });
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
