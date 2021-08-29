// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { Session, withIronSession } from 'next-iron-session';

export type NextIronRequest = NextApiRequest & { session: Session };

export type NextIronHandler = (req: NextIronRequest, res: NextApiResponse) => void | Promise<void>;

export default function withSession(handler: NextIronHandler | GetServerSideProps) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: '_linker_key',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  });
}
