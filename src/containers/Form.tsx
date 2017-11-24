import * as React from 'react';

import 'reflect-metadata';

export function field() {
  return function<T>(target: T, propertyName: string) {
    const initialValueCtor = Reflect.getMetadata(
      'design:type',
      target,
      propertyName,
    );
    Reflect.defineMetadata(
      `typedform:${propertyName}`,
      initialValueCtor(),
      target,
    );
  };
}

interface Props<T> {
  initialValues?: Partial<T>;
  children: (state: State<T>) => React.ReactElement<any>;
}

interface State<T> {
  fields: {
    [K in keyof T]: {
      value: T[K];
    }
  };
}

export class Form<T> extends React.Component<Props<T>, State<T>> {
  public render() {
    return this.props.children(this.state);
  }
}

export function createTypedForm<T>(_: new () => T) {
  type BoundForm = Form<T>;
  return Form as new () => BoundForm;
}
