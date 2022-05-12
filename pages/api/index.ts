import type { NextApiRequest, NextApiResponse } from 'next';

type Response = {
  app: String;
  description: String;
  version: String;
  git_ref: String;
  license: String;
};

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { method } = req;

  switch (method) {
    default:
      res.setHeader('Allow', ['GET']);
      res.status(200).json({
        app: process.env.APP_NAME,
        description: process.env.APP_DESCRIPTION,
        version: process.env.APP_VERSION,
        git_ref: process.env.COMMIT_HASH.substring(0, 8),
        license: process.env.APP_LICENSE
      });
      break;
  }
};
