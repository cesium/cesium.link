import { useQuery } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useLinks() {
  return useQuery(['links'], () => {
    return API.getLinks().then(({ data }) => data);
  });
}
