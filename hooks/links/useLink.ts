import { useQuery } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useLink(id: string) {
  return useQuery(['links', id], async () => {
    return API.getLink(id).then(({ link }) => link);
  });
}
