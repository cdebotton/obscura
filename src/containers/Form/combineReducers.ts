import { AnyAction } from './actions';

export type Reducer<S = any, A = AnyAction> = (state: S, action: A) => S;

type ReducerMap<S = any, A extends AnyAction = AnyAction> = {
  [key: string]: Reducer<S, A>;
};

export function combineReducers<S = any, A extends AnyAction = AnyAction>(
  reducers: ReducerMap<S, A>,
): Reducer<S, A> {
  return (state: S, action: A): S => {
    const nextState: Partial<S> = {};
    let hasChanged = false;

    for (const key in reducers) {
      if (!Object.hasOwnProperty.call(reducers, key)) {
        continue;
      }
      const reducer = reducers[key];
      nextState[key] = reducer(state, action);
      hasChanged = hasChanged || nextState[key] !== state[key];
    }

    return hasChanged ? (nextState as S) : state;
  };
}
