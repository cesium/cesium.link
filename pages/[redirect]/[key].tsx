import { GetServerSideProps } from 'next';
import ErrorPage from 'next/error';

import { SETTINGS } from '~/data/config';
import API from '~/lib/api';

const repos = {
  gh: SETTINGS.github,
  gl: SETTINGS.gitlab
};

const maps = {
  a: 'activities',
  n: 'articles',
  j: 'jobs'
};

const collections = {
  f: 'forms',
  r: 'redirects',
  u: 'links'
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { key, redirect } = params;

  if (Array.isArray(redirect) || Array.isArray(key)) {
    return {
      notFound: true
    };
  }

  if (redirect in repos) {
    return {
      redirect: {
        destination: `${repos[redirect].base_url}/${repos[redirect].username}/${key}`,
        permanent: false
      }
    };
  }

  if (redirect in maps) {
    return {
      redirect: {
        destination: `${SETTINGS.domain}/${maps[redirect]}/${key}`,
        permanent: false
      }
    };
  }

  if (redirect in collections) {
    const response = await API.get<{ url: string }>(`/api/${collections[redirect]}/${key}/url`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });

    if (!response.ok) {
      return {
        props: {
          code: response.status,
          message: response.data.error.message || response.statusText
        }
      };
    }

    return {
      redirect: {
        destination: response.data.url,
        permanent: false
      }
    };
  }

  return {
    notFound: true
  };
};

const Redirect = ({ message = 'This page could not be found.', code = 404 }) => (
  <ErrorPage title={message} statusCode={code} />
);

export default Redirect;
