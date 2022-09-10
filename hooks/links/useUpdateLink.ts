import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useUpdateLink() {
  const cache = useQueryClient();

  return useMutation(API.updateLink, {
    onSuccess: () => {
      cache.invalidateQueries(['links']);
      cache.invalidateQueries(['archived']);
    }
  });
}
