import { actionCreator, AnyAction, isType } from './actions';
import { combineReducers } from './combineReducers';

const INIT_FORM = Symbol('INIT_FORM');
export const initForm = actionCreator(INIT_FORM);

const SUBMIT_REQUEST = Symbol('SUBMIT_REQUEST');
const SUBMIT_SUCCESS = Symbol('SUBMIT_SUCCESS');
const SUBMIT_FAILURE = Symbol('SUBMIT_FAILURE');

export const submitRequest = actionCreator(SUBMIT_REQUEST);
export const submitSuccess = actionCreator(SUBMIT_SUCCESS);
export const submitFailure = actionCreator(SUBMIT_FAILURE);

export type Dirty<T> = { [K in keyof T]: boolean };
export type Errors<T> = Partial<{ [K in keyof T]: string }>;
export type Touched<T> = { [K in keyof T]: boolean };

export interface State<T> {
  dirty: Dirty<T>;
  isSubmitting: boolean;
  fields: T;
  errors: Errors<T>;
  touched: Touched<T>;
}

function isSubmitting(state: boolean, action: AnyAction) {
  if (isType(action, submitRequest)) {
    return true;
  }

  if (isType(action, submitSuccess) || isType(action, submitFailure)) {
    return false;
  }

  return state;
}

interface UpdateDirty {
  fieldName: string;
  dirty: boolean;
}

const UPDATE_DIRTY = Symbol('UPDATE_DIRTY');
export const updateDirty = actionCreator<UpdateDirty>(UPDATE_DIRTY);

function dirty<T>(state: Dirty<T>, action: AnyAction): Dirty<T> {
  if (isType(action, updateDirty)) {
    return {
      ...(state as any),
      [action.payload.fieldName]: action.payload.dirty,
    };
  }

  return state;
}

const UPDATE_ERRORS = Symbol('UPDATE_ERRORS');
export const updateErrors = actionCreator<Errors<any>>(UPDATE_ERRORS);

function errors<S>(state: Errors<S>, action: AnyAction): Errors<S> {
  if (isType(action, updateErrors)) {
    return action.payload as Errors<S>;
  }

  return state;
}

interface UpdateField<T, K extends keyof T> {
  fieldName: K;
  value: T[K];
}

const UPDATE_VALUE = Symbol('UPDATE_FIELD');
export const updateValue = actionCreator<UpdateField<any, any>>(UPDATE_VALUE);

function fields<S>(state: S, action: AnyAction): S {
  if (isType(action, updateValue)) {
    return {
      ...(state as any),
      [action.payload.fieldName]: action.payload.value,
    };
  }

  return state;
}

interface UpdateTouched {
  fieldName: string;
  touched: boolean;
}

const UPDATE_TOUCHED = Symbol('UPDATE_TOUCHED');
export const updateTouched = actionCreator<UpdateTouched>(UPDATE_TOUCHED);

function touched<S>(state: Touched<S>, action: AnyAction): Touched<S> {
  if (isType(action, updateTouched)) {
    return {
      ...(state as any),
      [action.payload.fieldName]: action.payload.touched,
    };
  }

  return state;
}

export function createReducer<T>() {
  return combineReducers<State<T>>({
    dirty,
    errors,
    fields,
    isSubmitting,
    touched,
  });
}
