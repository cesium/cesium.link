import ErrorPage from 'next/error'

import { domain } from '../../data/settings.yml'
import forms from '../../data/forms.yml'

const repos = {
  gh: {
    base_uri: "https://github.com",
    username: "cesium"
  },
  gl: {
    base_uri: "https://gitlab.com",
    username: "cesiuminho"
  }
}

const maps = {
  a: "activities",
  n: "articles",
  j: "jobs"
}

const uris = {
  f: forms
}

export async function getServerSideProps({ params }) {
  const { key, redirect } = params;

  if (redirect in repos) {
    return {
      redirect: {
        destination: `${repos[redirect].base_uri}/${repos[redirect].username}/${key}`,
        permanent: false
      }
    }
  }

  if (redirect in maps) {
    return {
      redirect: {
        destination: `${domain}/${maps[redirect]}/${key}`,
        permanent: false
      }
    }
  }

  if (redirect in uris) {
    if (!(key in uris[redirect])) {
      return {
        notFound: true
      }
    }

    return {
      redirect: {
        destination: `${uris[redirect][key]}`,
        permanent: false
      }
    }
  }

  return {
    notFound: true
  }
}

export default () => <ErrorPage statusCode={400} />