import { actionCreator, AnyAction, isType } from './actions';
import { combineReducers } from './combineReducers';

interface UpdateField {
  fieldName: string;
  value: any;
}

const UPDATE_VALUE = Symbol('UPDATE_FIELD');
export const updateValue = actionCreator<UpdateField>(UPDATE_VALUE);

interface UpdateTouched {
  fieldName: string;
  touched: boolean;
}

const UPDATE_TOUCHED = Symbol('UPDATE_TOUCHED');
export const updateTouched = actionCreator<UpdateTouched>(UPDATE_TOUCHED);

const INIT_FORM = Symbol('INIT_FORM');
export const initForm = actionCreator(INIT_FORM);

const SUBMIT_REQUEST = Symbol('SUBMIT_REQUEST');
const SUBMIT_SUCCESS = Symbol('SUBMIT_SUCCESS');
const SUBMIT_FAILURE = Symbol('SUBMIT_FAILURE');

export const submitRequest = actionCreator(SUBMIT_REQUEST);
export const submitSuccess = actionCreator(SUBMIT_SUCCESS);
export const submitFailure = actionCreator(SUBMIT_FAILURE);

export interface State<T> {
  isSubmitting: boolean;
  fields: T;
  errors: Partial<{ [K in keyof T]: string }>;
  touched: { [K in keyof T]: boolean };
}

type Errors<T> = State<T>['errors'];
type Fields<T> = State<T>['fields'];
type Touched<T> = State<T>['touched'];

function isSubmitting(state: boolean, action: AnyAction) {
  if (isType(action, submitRequest)) {
    return true;
  }

  if (isType(action, submitSuccess) || isType(action, submitFailure)) {
    return false;
  }

  return state;
}

function errors<S>(state: Errors<S>, action: AnyAction): Errors<S> {
  if (isType(action, updateValue)) {
    return state;
  }

  return state;
}

function fields<S>(state: Fields<S>, action: AnyAction): Fields<S> {
  if (isType(action, updateValue)) {
    return {
      ...(state as any),
      [action.payload.fieldName]: action.payload.value,
    };
  }

  return state;
}

function touched<S>(state: Touched<S>, action: AnyAction): Touched<S> {
  if (isType(action, updateValue)) {
    return {
      ...(state as any),
      [action.payload.fieldName]: true,
    };
  }

  if (isType(action, updateTouched)) {
    return {
      ...(state as any),
      [action.payload.fieldName]: action.payload.touched,
    };
  }

  return state;
}

export const reducer = combineReducers({
  errors,
  fields,
  isSubmitting,
  touched,
});
