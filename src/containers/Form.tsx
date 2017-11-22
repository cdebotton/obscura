import * as React from 'react';

import 'reflect-metadata';

function getInitialValue<T>(cls: T, propertyName: string) {
  const typeCtor = Reflect.getMetadata('design:type', cls, propertyName);
  return typeCtor();
}

export const field = () => {
  return (object: any, propertyName: string) => {
    const metadataFields =
      Reflect.getMetadata('metadata:fields', object.constructor) || {};
    Reflect.defineMetadata(
      'metadata:fields',
      {
        ...metadataFields,
        [propertyName]: getInitialValue(object, propertyName),
      },
      object.constructor,
    );
  };
};

type Props<T> = {
  initialValues?: T;
  children: (state: FormContext<T>) => React.ReactElement<any>;
};

type State<T> = {
  fields: {
    [K in keyof T]: {
      isDirty: boolean;
      value: T[K];
    }
  };
};

type FormContext<T> = {
  getState: () => T;
  fields: {
    [K in keyof T]: State<T>['fields'][K] & {
      onChange: (event: React.SyntheticEvent<any>) => void;
    }
  };
};

function createStateFromSchema<T>(schema: new () => T): State<T> {
  const fields = Reflect.getMetadata('metadata:fields', schema);

  const initialFieldState = Object.keys(fields).reduce((acc, fName) => {
    return {
      ...acc,
      [fName]: {
        isDirty: false,
        value: fields[fName],
      },
    };
  }, {});

  return { fields: initialFieldState as State<T>['fields'] };
}

export function createFormWithSchema<T>(schema: new () => T) {
  return class extends React.Component<Props<T>, State<T>> {
    public constructor(props: Props<T>) {
      super(props);

      this.state = createStateFromSchema(schema);
    }

    public render() {
      const formContext = this.injectFormHelpers(this.state);

      return this.props.children(formContext);
    }

    public getState() {
      return Object.keys(this.state.fields).reduce(
        (acc, key) => {
          return {
            ...(acc as any),
            [key]: this.state.fields[key].value,
          };
        },
        {} as T,
      );
    }

    private injectFormHelpers(state: State<T>): FormContext<T> {
      return {
        ...state,
        fields: Object.keys(state.fields).reduce(
          (acc, key) => {
            return {
              ...(acc as any),
              [key]: {
                ...state.fields[key],
                onChange: (event: React.SyntheticEvent<any>) => {
                  this.setState({
                    ...this.state,
                    fields: {
                      ...(this.state.fields as any),
                      [key]: {
                        isDirty: false,
                        value: event.currentTarget.value,
                      },
                    },
                  });
                },
              },
            };
          },
          {} as FormContext<T>['fields'],
        ),
        getState: this.getState.bind(this),
      };
    }
  };
}
