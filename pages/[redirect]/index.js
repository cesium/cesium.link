import ErrorPage from 'next/error';

import { domain } from '../../data/settings.yml';

export async function getServerSideProps({ params }) {
  const { redirect } = params;

  return {
    redirect: {
      destination: `${domain}/${redirect}`,
      permanent: false
    }
  };
}

const Redirect = ({ message = 'This page could not be found.', code = 404 }) => (
  <ErrorPage title={message} statusCode={code} />
);

export default Redirect;
