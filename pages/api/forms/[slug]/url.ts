import type { NextApiRequest, NextApiResponse } from 'next';
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
  data: string;
};

type Response = Success | Error;

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
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
        const form: IForm = await Form.findOneAndUpdate(
          { slug },
          { $inc: { visits: 1 } },
          { new: true }
        );

        if (!form) {
          return res.status(404).json({ success: false, error: { message: 'Form not found' } });
        }
        res.status(200).json({ success: true, data: form.url });
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
