import type { NextApiResponse } from 'next';
import withAuth from '~/lib/auth';
import { NextIronRequest } from '~/lib/session';
import dbConnect from '~/lib/database';
import Account, { IAccount } from '~/models/Account';

type Error = {
  success: false;
  error: {
    message: string;
  };
};

type Success = {
  success: true;
  data?: IAccount;
};

type Response = Success | Error;

export default withAuth(async (req: NextIronRequest, res: NextApiResponse<Response>) => {
  const currentUser = req.session.get('currentUser');

  if (!currentUser.admin) {
    return res.status(403).end();
  }

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
        const account = await Account.findById(id).select('-password');

        if (!account) {
          return res.status(404).json({ success: false, error: { message: 'Account not found' } });
        }

        res.status(200).json({ success: true, data: account });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;

    case 'PUT':
      try {
        const account = await Account.findByIdAndUpdate(
          id,
          { ...req.body, updated: Date.now() },
          {
            new: true,
            runValidators: true
          }
        ).select('-password');

        if (!account) {
          return res.status(404).json({ success: false, error: { message: 'Account not found' } });
        }

        res.status(200).json({ success: true, data: account });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;

    case 'DELETE':
      try {
        if (currentUser.id == id) {
          return res
            .status(403)
            .json({ success: false, error: { message: 'Cannot delete own account' } });
        }

        const deleted = await Account.deleteOne({ _id: id });
        if (!deleted) {
          return res
            .status(400)
            .json({ success: false, error: { message: 'Account could not be deleted' } });
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
