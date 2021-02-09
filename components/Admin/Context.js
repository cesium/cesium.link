import { useReducer, useContext, useMemo, createContext } from "react";

import API from "../../utils/api";

const LinksContext = createContext();

const dispatchMiddleware = (dispatch) => {
  return async (action) => {
    switch (action.type) {
      case "CREATE":
        const response = await API.post("/links", action.link);
        action.link = response.data.data;
        dispatch(action);
        break;
      case "DELETE":
        await API.delete(`/links/${action.id}`);
      default:
        return dispatch(action);
    }
  };
};

const reducer = (links, action) => {
  switch (action.type) {
    case "CREATE":
      return [action.link, ...links];
    case "DELETE":
      return links.filter((link) => link._id !== action.id);
    case "UPDATE":
      return links;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const AdminContextProvider = ({ children, initialState }) => {
  const [links, dispatch] = useReducer(reducer, initialState);
  const values = useMemo(
    () => ({ links, dispatch: dispatchMiddleware(dispatch) }),
    [links, dispatch]
  );

  return (
    <LinksContext.Provider value={values}>{children}</LinksContext.Provider>
  );
};

export const useLinks = () => useContext(LinksContext);
