import { useContext, createContext } from 'react';

export const EditingContext = createContext();

export const reducer = async (editing, action) => {
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

export const useEditing = () => useContext(EditingContext);
