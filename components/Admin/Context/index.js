import useAsyncReducer from '~/hooks/useAsyncReducer';
import { reducer as reducerLinks, LinksContext } from './links';
import { reducer as reducerForms, FormsContext } from './forms';
import { reducer as reducerRedirects, RedirectsContext } from './redirects';

export const AdminContextProvider = ({ children, initialState }) => {
  const [links, dispatchLinks] = useAsyncReducer(reducerLinks, initialState);
  const [forms, dispatchForms] = useAsyncReducer(reducerForms, initialState);
  const [redirects, dispatchRedirects] = useAsyncReducer(reducerRedirects, initialState);

  return (
    <LinksContext.Provider value={{ links, dispatch: dispatchLinks }}>
      <FormsContext.Provider value={{ forms, dispatch: dispatchForms }}>
        <RedirectsContext.Provider value={{ redirects, dispatch: dispatchRedirects }}>
          {children}
        </RedirectsContext.Provider>
      </FormsContext.Provider>
    </LinksContext.Provider>
  );
};

export { useLinks } from './links';
export { useForms } from './forms';
export { useRedirects } from './redirects';
