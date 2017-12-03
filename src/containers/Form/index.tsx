import { Form } from './containers/Form';

export function createTypedForm<T>() {
  type TypedForm = Form<T>;
  return Form as new () => TypedForm;
}

export { Errors as FormErrors, Touched } from './state';
