import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '~/lib/database';
import Form, { IForm } from '~/models/Form';

type Error = {
  error: {
    message: string;
  };
};

type Success = { form: IForm } | { data: IForm[] };

type Response = Success | Error;

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const forms: IForm[] = await Form.find({}).sort({ created: 'asc' });
        res.status(200).json({ data: forms });
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: { message: error.message } });
      }
      break;
    case 'POST':
      try {
        const form: IForm = await Form.create(req.body);
        res.status(201).json({ form: form });
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
