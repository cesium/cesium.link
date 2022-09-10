import { useQuery } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useArchivedLinks() {
  return useQuery(['archived'], () => {
    return API.getArchivedLinks().then(({ data }) => data);
  });
}
