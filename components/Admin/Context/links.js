import { useContext, createContext } from 'react';
import { arrayMove } from 'react-sortable-hoc';

import API from '~/lib/api';

export const LinksContext = createContext();

export const reducer = async (links, action) => {
  const { type, link, links: newLinks, oldIndex, newIndex } = action;
  let response;

  switch (type) {
    case 'INIT':
      return newLinks;
    case 'CREATE':
      link.index = links.length == 0 ? 0 : links[links.length - 1].index + 1;
      response = await API.post('/api/links', link);
      return [...links, response.data.data];
    case 'DELETE':
      await API.delete(`/api/links/${action.id}`);
      return links.filter((link) => link._id !== action.id);
    case 'UPDATE':
      return links;
    case 'SORT':
      if (oldIndex !== newIndex) {
        links = arrayMove([].concat(links), oldIndex, newIndex).filter((elem) => !!elem);
        links.map((elem, index) => {
          API.put(`/api/links/${elem._id}`, { index });
        });
      }
      return links;
    default:
      throw new Error(`Unknown action: ${type}`);
  }
};

export const useLinks = () => useContext(LinksContext);
