import useAsyncReducer from '~/hooks/useAsyncReducer';

import { EditingContext } from './EditingContext';

const reducer = async (editing, action) => {
  const { type, key } = action;

  switch (type) {
    case 'EDIT':
      return { ...editing, key };
    case 'CANCEL':
      return { ...editing, key: '' };
    default:
      throw new Error(`Unknown action: ${type}`);
  }
};

export function EditingProvider({ children, initialState }) {
  const [editing, dispatchEditing] = useAsyncReducer(reducer, initialState);

  return (
    <EditingContext.Provider value={{ editing, dispatch: dispatchEditing }}>
      {children}
    </EditingContext.Provider>
  );
}
