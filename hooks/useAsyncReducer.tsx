import { useState } from 'react';

export default function useAsyncReducer<T>(
  reducer: (state: T, action) => Promise<T>,
  initState: T
) {
  const [state, setState] = useState(initState);
  const dispatchState = async (action) => setState(await reducer(state, action));

  return [state, dispatchState];
}
