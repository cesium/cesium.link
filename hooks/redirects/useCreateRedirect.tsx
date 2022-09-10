import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useCreateRedirect() {
  const cache = useQueryClient();

  return useMutation(API.createRedirect, {
    onSuccess: () => {
      cache.invalidateQueries(['redirects']);
    }
  });
}
