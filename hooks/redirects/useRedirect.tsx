import { useQuery } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useRedirect(id: string) {
  return useQuery(['redirects', id], async () => {
    return API.getRedirect(id).then(({ redirect }) => redirect);
  });
}
