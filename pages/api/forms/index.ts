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
  data: IForm | IForm[];
};

type Response = Success | Error;

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const forms: IForm[] = await Form.find({}).sort({ created: 'asc' });
        res.status(200).json({ success: true, data: forms });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    case 'POST':
      try {
        const form: IForm = await Form.create(req.body);
        res.status(201).json({ success: true, data: form });
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
