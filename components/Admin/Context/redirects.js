import { useContext, createContext } from 'react';

import API from '~/lib/api';

export const RedirectsContext = createContext();

export const reducer = async (redirects, action) => {
  const { type, slug, redirect, id, redirects: newRedirects } = action;
  let response;

  switch (type) {
    case 'INIT':
      return newRedirects;
    case 'CREATE':
      response = await API.post('/api/redirects', redirect);
      return [...redirects, response.data.data];
    case 'UPDATE':
      response = await API.put(`/api/redirects/${slug}`, form);
      return redirects.map((item) => (item._id === id ? { ...item, ...response.data.data } : item));
    case 'DELETE':
      await API.delete(`/api/redirects/${slug}`);
      return redirects.filter((item) => item.slug !== slug);
    default:
      throw new Error(`Unknown action: ${type}`);
  }
};

export const useRedirects = () => useContext(RedirectsContext);
