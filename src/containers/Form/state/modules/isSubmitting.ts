import { actionCreator, AnyAction, isType } from '../lib/actions';

const SUBMIT_REQUEST = Symbol('SUBMIT_REQUEST');
const SUBMIT_SUCCESS = Symbol('SUBMIT_SUCCESS');
const SUBMIT_FAILURE = Symbol('SUBMIT_FAILURE');

export type Submitting = boolean;

export const submitRequest = actionCreator(SUBMIT_REQUEST);
export const submitSuccess = actionCreator<any>(SUBMIT_SUCCESS);
export const submitFailure = actionCreator<string>(SUBMIT_FAILURE);

export function isSubmitting(state: Submitting, action: AnyAction): Submitting {
  if (isType(action, submitRequest)) {
    return true;
  }

  if (isType(action, submitSuccess) || isType(action, submitFailure)) {
    return false;
  }

  return state;
}
