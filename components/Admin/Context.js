import { useContext, createContext } from 'react';
import useAsyncReducer from '../../utils/useAsyncReducer';
import { arrayMove } from 'react-sortable-hoc';

import API from '../../utils/api';

const LinksContext = createContext();

const reducer = async (links, action) => {
  const { type, link, links: newLinks, oldIndex, newIndex } = action;
  let response;

  switch (type) {
    case 'INIT':
      return newLinks;
    case 'CREATE':
      link.index = links.length;
      response = await API.post('/links', link);
      return [...links, response.data.data];
    case 'DELETE':
      await API.delete(`/links/${action.id}`);
      return links.filter((link) => link._id !== action.id);
    case 'UPDATE':
      return links;
    case 'SORT':
      if (oldIndex !== newIndex) {
        links = arrayMove([].concat(links), oldIndex, newIndex).filter((elem) => !!elem);
        links.map((elem, index) => {
          API.put(`/links/${elem._id}`, { index });
        });
      }
      return links;
    default:
      throw new Error(`Unknown action: ${type}`);
  }
};

export const AdminContextProvider = ({ children, initialState }) => {
  const [links, dispatch] = useAsyncReducer(reducer, initialState);

  return <LinksContext.Provider value={{ links, dispatch }}>{children}</LinksContext.Provider>;
};

export const useLinks = () => useContext(LinksContext);
