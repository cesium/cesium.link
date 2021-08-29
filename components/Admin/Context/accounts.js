import { useContext, createContext } from 'react';

import API from '~/lib/api';

export const AccountsContext = createContext();

export const reducer = async (accounts, action) => {
  const { type, account, accounts: newAccounts, id } = action;
  let response;

  switch (type) {
    case 'INIT':
      return newAccounts;
    case 'CREATE':
      response = await API.post('/api/accounts', account);
      return [...accounts, response.data.data];
    case 'UPDATE':
      response = await API.put(`/api/accounts/${id}`, account);
      return accounts.map((item) => (item._id === id ? { ...item, ...response.data.data } : item));
    case 'DELETE':
      await API.delete(`/api/accounts/${action.id}`);
      return accounts.filter((account) => account._id !== action.id);
    default:
      throw new Error(`Unknown action: ${type}`);
  }
};

export const useAccounts = () => useContext(AccountsContext);
