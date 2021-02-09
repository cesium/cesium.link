import { useContext, createContext } from "react";
import useAsyncReducer from "../../utils/useAsyncReducer";

import API from "../../utils/api";

const LinksContext = createContext();

const reducer = async (links, action) => {
  switch (action.type) {
    case "INIT":
      return action.links;
    case "CREATE":
      const response = await API.post("/links", action.link);
      return [response.data.data, ...links];
    case "DELETE":
      await API.delete(`/links/${action.id}`);
      return links.filter((link) => link._id !== action.id);
    case "UPDATE":
      return links;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const AdminContextProvider = ({ children, initialState }) => {
  const [links, dispatch] = useAsyncReducer(reducer, initialState);

  return (
    <LinksContext.Provider value={{ links, dispatch }}>
      {children}
    </LinksContext.Provider>
  );
};

export const useLinks = () => useContext(LinksContext);
