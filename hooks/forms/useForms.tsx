import { useQuery } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useForms() {
  return useQuery(['forms'], () => {
    return API.getForms().then(({ data }) => data);
  });
}
