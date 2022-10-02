import { PropsWithChildren } from 'react';

import useAsyncReducer from '~/hooks/useAsyncReducer';

import { EditingContext } from './EditingContext';
import { ActionType } from './types';

const reducer = async (editing, action: { type: ActionType; key: string }) => {
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

type EditingProviderProps<T> = {
  initialState: T;
};

export function EditingProvider<T>({
  children,
  initialState
}: PropsWithChildren<EditingProviderProps<T>>) {
  const [editing, dispatchEditing] = useAsyncReducer<T>(reducer, initialState);

  return (
    <EditingContext.Provider value={{ editing, dispatch: dispatchEditing }}>
      {children}
    </EditingContext.Provider>
  );
}
