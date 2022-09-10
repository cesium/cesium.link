import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '~/lib/services';

export function useUpdateRedirect() {
  const cache = useQueryClient();

  return useMutation(API.updateRedirect, {
    onSuccess: () => {
      cache.invalidateQueries(['redirects']);
    }
  });
}
