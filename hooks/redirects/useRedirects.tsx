import { useQuery } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useRedirects() {
  return useQuery(['redirects'], () => {
    return API.getRedirects().then(({ data }) => data);
  });
}
