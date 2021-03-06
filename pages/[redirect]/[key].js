import ErrorPage from 'next/error';
import API from '../../utils/api';

import { domain, github, gitlab } from '../../data/settings.yml';

const repos = {
  gh: github,
  gl: gitlab
};

const maps = {
  a: 'activities',
  n: 'articles',
  j: 'jobs'
};

export async function getServerSideProps({ params }) {
  const { key, redirect } = params;

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

  if (redirect === 'r') {
    const response = await API.get(`/links/${key}/url`)
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

  if (redirect === 'f') {
    const response = await API.get(`/forms/${key}/url`)
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
}

const Redirect = ({ message = 'This page could not be found.', code = 404 }) => (
  <ErrorPage title={message} statusCode={code} />
);

export default Redirect;
