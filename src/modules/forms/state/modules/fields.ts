import { actionCreator, AnyAction, isType } from '../lib/actions';

interface UpdateField<T, K extends keyof T> {
  fieldName: K;
  value: T[K];
}

const UPDATE_VALUE = Symbol('UPDATE_FIELD');
export const updateValue = actionCreator<UpdateField<any, any>>(UPDATE_VALUE);

export function fields<S>(state: S, action: AnyAction): S {
  if (isType(action, updateValue)) {
    return {
      ...(state as any),
      [action.payload.fieldName]: action.payload.value,
    };
  }

  return state;
}
