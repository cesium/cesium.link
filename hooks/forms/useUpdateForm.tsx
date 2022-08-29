import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useUpdateForm() {
  const cache = useQueryClient();

  return useMutation(API.updateForm, {
    onSuccess: () => {
      cache.invalidateQueries(['forms']);
    }
  });
}
