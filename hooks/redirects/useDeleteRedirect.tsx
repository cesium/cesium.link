import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useDeleteRedirect() {
  const cache = useQueryClient();

  return useMutation(API.deleteRedirect, {
    onSuccess: () => {
      cache.invalidateQueries(['redirects']);
    }
  });
}
