import { Form } from './Form';

export function createTypedForm<T>() {
  type TypedForm = Form<T>;
  return Form as new () => TypedForm;
}
