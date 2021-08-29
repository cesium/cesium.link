import useAsyncReducer from '~/hooks/useAsyncReducer';
import { reducer as reducerLinks, LinksContext } from './links';
import { reducer as reducerForms, FormsContext } from './forms';
import { reducer as reducerRedirects, RedirectsContext } from './redirects';
import { reducer as reducerAccounts, AccountsContext } from './accounts';

export const AdminContextProvider = ({ children, initialState }) => {
  const [links, dispatchLinks] = useAsyncReducer(reducerLinks, initialState.links || []);
  const [forms, dispatchForms] = useAsyncReducer(reducerForms, initialState.forms || []);
  const [redirects, dispatchRedirects] = useAsyncReducer(
    reducerRedirects,
    initialState.redirects || []
  );
  const [accounts, dispatchAccounts] = useAsyncReducer(
    reducerAccounts,
    initialState.accounts || []
  );

  return (
    <LinksContext.Provider value={{ links, dispatch: dispatchLinks }}>
      <FormsContext.Provider value={{ forms, dispatch: dispatchForms }}>
        <RedirectsContext.Provider value={{ redirects, dispatch: dispatchRedirects }}>
          <AccountsContext.Provider value={{ accounts, dispatch: dispatchAccounts }}>
            {children}
          </AccountsContext.Provider>
        </RedirectsContext.Provider>
      </FormsContext.Provider>
    </LinksContext.Provider>
  );
};

export { useLinks } from './links';
export { useForms } from './forms';
export { useRedirects } from './redirects';
export { useAccounts } from './accounts';
