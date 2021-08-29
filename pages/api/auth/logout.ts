import type { NextApiResponse } from 'next';
import withSession, { NextIronRequest } from '~/lib/session';
import { IAccount } from '~/models/Account';

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

export default withSession(async (req: NextIronRequest, res: NextApiResponse<Response>) => {
  req.session.destroy();
  res.redirect('/');
});
