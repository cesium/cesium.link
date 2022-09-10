import { useQuery } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useForm(id: string) {
  return useQuery(['forms', id], async () => {
    return API.getForm(id).then(({ form }) => form);
  });
}
