import { GetServerSideProps } from 'next';
import ErrorPage from 'next/error';

import { domain } from '~/data/settings.json';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { redirect } = params;

  return {
    redirect: {
      destination: `${domain}/${redirect}`,
      permanent: false
    }
  };
};

const Redirect = ({ message = 'This page could not be found.', code = 404 }) => (
  <ErrorPage title={message} statusCode={code} />
);

export default Redirect;
