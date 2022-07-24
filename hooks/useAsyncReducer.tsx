import { useState } from 'react';

export default function useAsyncReducer(
  reducer: (state: unknown, action) => Promise<unknown>,
  initState: unknown
) {
  const [state, setState] = useState(initState);
  const dispatchState = async (action) => setState(await reducer(state, action));

  return [state, dispatchState];
}
