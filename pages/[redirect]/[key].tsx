import { GetServerSideProps } from 'next';
import ErrorPage from 'next/error';
import API from '~/lib/api';

import { domain, github, gitlab } from '~/data/settings.json';

const repos = {
  gh: github,
  gl: gitlab
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
        destination: `${domain}/${maps[redirect]}/${key}`,
        permanent: false
      }
    };
  }

  if (redirect in collections) {
    const response = await API.get(`/api/${collections[redirect]}/${key}/url`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });

    if (!response.data.success) {
      return {
        props: {
          code: response.status,
          message: response.data.error.message || response.statusText
        }
      };
    }

    return {
      redirect: {
        destination: response.data.data,
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
