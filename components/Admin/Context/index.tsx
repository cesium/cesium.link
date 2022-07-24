import useAsyncReducer from '~/hooks/useAsyncReducer';
import { reducer as reducerLinks, LinksContext } from './links';
import { reducer as reducerForms, FormsContext } from './forms';
import { reducer as reducerRedirects, RedirectsContext } from './redirects';
import { reducer as reducerArchived, ArchivedLinksContext } from './archived';

export const AdminContextProvider = ({ children, initialState }) => {
  const [links, dispatchLinks] = useAsyncReducer(reducerLinks, initialState);
  const [forms, dispatchForms] = useAsyncReducer(reducerForms, initialState);
  const [redirects, dispatchRedirects] = useAsyncReducer(reducerRedirects, initialState);
  const [archived, dispatchArchived] = useAsyncReducer(reducerArchived, initialState);

  return (
    <LinksContext.Provider value={{ links, dispatch: dispatchLinks }}>
      <FormsContext.Provider value={{ forms, dispatch: dispatchForms }}>
        <RedirectsContext.Provider value={{ redirects, dispatch: dispatchRedirects }}>
          <ArchivedLinksContext.Provider value={{ archived, dispatch: dispatchArchived }}>
            {children}
          </ArchivedLinksContext.Provider>
        </RedirectsContext.Provider>
      </FormsContext.Provider>
    </LinksContext.Provider>
  );
};

export { useLinks } from './links';
export { useForms } from './forms';
export { useRedirects } from './redirects';
export { useArchivedLinks } from './archived';
