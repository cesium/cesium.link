import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useCreateLink() {
  const cache = useQueryClient();

  return useMutation(API.createLink, {
    onSuccess: () => {
      cache.invalidateQueries(['links']);
    }
  });
}
