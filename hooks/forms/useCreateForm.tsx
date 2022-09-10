import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useCreateForm() {
  const cache = useQueryClient();

  return useMutation(API.createForm, {
    onSuccess: () => {
      cache.invalidateQueries(['forms']);
    }
  });
}
