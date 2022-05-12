import { GetServerSideProps } from 'next';
import ErrorPage from 'next/error';
import API from '~/lib/api';

import settings from '~/data/settings.json';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { redirect } = params;

  const response = await API.get(`/api/redirects/${redirect}/url`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  if (!response.data.success) {
    return {
      redirect: {
        destination: `${settings.domain}/${redirect}`,
        permanent: false
      }
    };
  }

  return {
    redirect: {
      destination: response.data.data,
      permanent: false
    }
  };
};

const Redirect = ({ message = 'This page could not be found.', code = 404 }) => (
  <ErrorPage title={message} statusCode={code} />
);

export default Redirect;
