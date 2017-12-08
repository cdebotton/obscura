import { actionCreator } from './lib/actions';
import { combineReducers } from './lib/combineReducers';
import { dirty, Dirty, updateDirty } from './modules/dirty';
import { errors, Errors, updateErrors } from './modules/errors';
import { fields, updateValue } from './modules/fields';
import {
  isSubmitting,
  submitFailure,
  submitRequest,
  submitSuccess,
  Submitting,
} from './modules/isSubmitting';
import { touched, Touched, updateTouched } from './modules/touched';

export interface State<T> {
  dirty: Dirty<T>;
  isSubmitting: Submitting;
  fields: T;
  errors: Errors<T>;
  touched: Touched<T>;
}

const INIT_FORM = Symbol('INIT_FORM');
export const initForm = actionCreator<State<any>>(INIT_FORM);

export function createReducer<T>() {
  return combineReducers<State<T>>({
    dirty,
    errors,
    fields,
    isSubmitting,
    touched,
  });
}

export { Reducer } from './lib/combineReducers';

export {
  dirty,
  Dirty,
  errors,
  Errors,
  fields,
  isSubmitting,
  Submitting,
  touched,
  Touched,
  submitFailure,
  submitRequest,
  submitSuccess,
  updateDirty,
  updateErrors,
  updateTouched,
  updateValue,
};
