import type { NextApiRequest, NextApiResponse } from 'next';

import { Configuration, getAppConfig } from '~/lib/config';

export default async (req: NextApiRequest, res: NextApiResponse<Configuration>) => {
  const { method } = req;

  switch (method) {
    default:
      res.setHeader('Allow', ['GET']);
      res.status(200).json(getAppConfig());
      break;
  }
};
