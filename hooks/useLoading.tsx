import { useReducer } from 'react';

export type StatusType = 'LOADING' | 'LOADED' | 'ERROR';

type UseLoadingState = {
  status: StatusType;
  error?: string;
};

const initialState: UseLoadingState = {
  status: 'LOADING',
};

type UseLoadingAction =
  | { type: 'LOADING' }
  | { type: 'LOADED' }
  | { type: 'ERROR'; payload: string };

function reducer(
  state: UseLoadingState,
  action: UseLoadingAction
): UseLoadingState {
  switch (action.type) {
    case 'LOADING':
      return { ...state, status: 'LOADING' };
    case 'LOADED':
      return { ...state, status: 'LOADED' };
    case 'ERROR':
      return { ...state, status: 'ERROR', error: action.payload };
    default:
      return state;
  }
}

/**
 * UseLoading hook. It contains the state and dispatch function.State consists of status and error.
 */
export default function useLoading() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
