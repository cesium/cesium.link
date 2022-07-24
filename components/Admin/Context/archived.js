import { useContext, createContext } from 'react';

import API from '~/lib/api';

export const ArchivedLinksContext = createContext();

export const reducer = async (archived, action) => {
  const { type, link, archived: links } = action;

  switch (type) {
    case 'INIT':
      return links;
    case 'UNARCHIVE':
      await API.put(`/api/links/${action.id}`, { ...link, archived: false });
      return archived.filter((link) => link._id !== action.id);
    case 'DELETE':
      await API.delete(`/api/links/${action.id}`);
      return archived.filter((link) => link._id !== action.id);
    default:
      throw new Error(`Unknown action: ${type}`);
  }
};

export const useArchivedLinks = () => useContext(ArchivedLinksContext);
