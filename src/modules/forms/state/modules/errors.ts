import { actionCreator, AnyAction, isType } from '../lib/actions';

export type Errors<T> = Partial<{ [K in keyof T]: string }>;

const UPDATE_ERRORS = Symbol('UPDATE_ERRORS');
export const updateErrors = actionCreator<Errors<any>>(UPDATE_ERRORS);

export function errors<S>(state: Errors<S>, action: AnyAction): Errors<S> {
  if (isType(action, updateErrors)) {
    return action.payload as Errors<S>;
  }

  return state;
}
