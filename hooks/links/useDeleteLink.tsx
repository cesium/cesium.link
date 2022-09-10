import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useDeleteLink() {
  const cache = useQueryClient();

  return useMutation(API.deleteLink, {
    onSuccess: () => {
      cache.invalidateQueries(['links']);
      cache.invalidateQueries(['archived']);
    }
  });
}
