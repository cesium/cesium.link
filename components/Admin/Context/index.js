import useAsyncReducer from '../../../utils/useAsyncReducer';
import { reducer as reducerLinks, LinksContext } from './links';
import { reducer as reducerForms, FormsContext } from './forms';

export const AdminContextProvider = ({ children, initialState }) => {
  const [links, dispatchLinks] = useAsyncReducer(reducerLinks, initialState);
  const [forms, dispatchForms] = useAsyncReducer(reducerForms, initialState);

  return (
    <LinksContext.Provider value={{ links, dispatch: dispatchLinks }}>
      <FormsContext.Provider value={{ forms, dispatch: dispatchForms }}>
        {children}
      </FormsContext.Provider>
    </LinksContext.Provider>
  );
};

export { useLinks } from './links';
export { useForms } from './forms';
