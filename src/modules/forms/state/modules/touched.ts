import { actionCreator, AnyAction, isType } from '../lib/actions';
export type Touched<T> = { [K in keyof T]: boolean };

interface UpdateTouched {
  fieldName: string;
  touched: boolean;
}

const UPDATE_TOUCHED = Symbol('UPDATE_TOUCHED');
export const updateTouched = actionCreator<UpdateTouched>(UPDATE_TOUCHED);

export function touched<S>(state: Touched<S>, action: AnyAction): Touched<S> {
  if (isType(action, updateTouched)) {
    return {
      ...(state as any),
      [action.payload.fieldName]: action.payload.touched,
    };
  }

  return state;
}
