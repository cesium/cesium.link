import { GetServerSideProps } from 'next';
import ErrorPage from 'next/error';

import { SETTINGS } from '~/data/config';
import API from '~/lib/api';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { redirect } = params;

  const response = await API.get(`/api/redirects/${redirect}/url`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  if (!response.ok) {
    return {
      redirect: {
        destination: `${SETTINGS.domain}/${redirect}`,
        permanent: false
      }
    };
  }

  return {
    redirect: {
      destination: response.data.url,
      permanent: false
    }
  };
};

const Redirect = ({ message = 'This page could not be found.', code = 404 }) => (
  <ErrorPage title={message} statusCode={code} />
);

export default Redirect;
