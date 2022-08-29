import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useDeleteForm() {
  const cache = useQueryClient();

  return useMutation(API.deleteForm, {
    onSuccess: () => {
      cache.invalidateQueries(['forms']);
    }
  });
}
