import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '~/lib/database';
import Form, { IForm } from '~/models/Form';

type Error = {
  error: {
    message: string;
  };
};

type Success = { form: IForm };

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
        const form = await Form.findById(id);

        if (!form) {
          return res.status(404).json({ error: { message: 'Form not found' } });
        }
        res.status(200).json({ form });
      } catch (error) {
        res.status(400).json({ error: { message: error.message } });
      }
      break;

    case 'PUT':
      try {
        const form: IForm = await Form.findByIdAndUpdate(
          id,
          { ...req.body, updated: Date.now() },
          {
            new: true,
            runValidators: true
          }
        );

        if (!form) {
          return res.status(404).json({ error: { message: 'Form not found' } });
        }
        res.status(200).json({ form });
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: { message: error.message } });
      }
      break;

    case 'DELETE':
      try {
        const deleted = await Form.findByIdAndDelete(id);
        if (!deleted) {
          return res.status(400).json({ error: { message: 'Form could not be deleted' } });
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
