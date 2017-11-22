import { Component } from 'react';
import 'reflect-metadata';

type Props<T> = {
  children: (fields: State<T>) => React.ReactElement<any>;
};

type State<T> = {
  fields: {
    [K in keyof T]: {
      fieldName: K;
      value: T[K];
    }
  };
};

export function makeForm<T>(
  target: new () => T,
): React.ComponentClass<Props<T>> {
  return class extends Component<Props<T>, State<T>> {
    public constructor(props: Props<T>) {
      super(props);

      const fields = Reflect.getMetadata('form:fields', target);
      this.state = { fields };
    }
    public render() {
      return this.props.children(this.state);
    }
  };
}

export function addField() {
  return function<T>(object: T, propertyName: string) {
    const type = Reflect.getMetadata('design:type', object, propertyName);
    const fields = Reflect.getMetadata('form:fields', object.constructor) || {};
    Reflect.defineMetadata(
      'form:fields',
      {
        ...fields,
        [propertyName]: type(),
      },
      object.constructor,
    );
  };
}
