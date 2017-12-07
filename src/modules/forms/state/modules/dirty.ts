import { actionCreator, AnyAction, isType } from '../lib/actions';

export type Dirty<T> = { [K in keyof T]: boolean };

interface UpdateDirty {
  fieldName: string;
  dirty: boolean;
}

const UPDATE_DIRTY = Symbol('UPDATE_DIRTY');
export const updateDirty = actionCreator<UpdateDirty>(UPDATE_DIRTY);

export function dirty<T>(state: Dirty<T>, action: AnyAction): Dirty<T> {
  if (isType(action, updateDirty)) {
    return {
      ...(state as any),
      [action.payload.fieldName]: action.payload.dirty,
    };
  }

  return state;
}
