import * as React from 'react';

export type FormValues = {
  [x: string]: any;
};

type FormFields<T> = {
  [K in keyof T]: {
    value: T[K];
    isTouched: boolean;
    isDirty: boolean;
    isValid: boolean;
  }
};

interface State<T> {
  isSubmitting: boolean;
  fields: FormFields<T>;
  errors: Partial<{ [K in keyof T]: string }>;
  touched: { [K in keyof T]: boolean };
}

interface FormContext<T> {
  fields: {
    [K in keyof T]: FormFields<T>[K] & {
      id: K;
      onChange: (event: React.ChangeEvent<any>) => void;
    }
  };
}

interface Props<T> {
  initialValues: T;
  validate?: (values: T) => { [K in keyof T]: boolean };
  children: (context: FormContext<T>) => React.ReactElement<any>;
}

export class TypedForm<T> extends React.Component<Props<T>, State<T>> {
  public constructor(props: Props<T>) {
    super(props);

    this.state = {
      errors: Object.keys(props.initialValues).reduce((acc, key) => {
        return {
          ...(acc as any),
          [key]: this.props.validate
            ? typeof this.props.validate(this.props.initialValues)[key] ===
              'undefined'
            : true,
        };
      }, {}),
      fields: Object.keys(props.initialValues).reduce((acc, key) => {
        return {
          ...(acc as any),
          [key]: {
            value: props.initialValues[key],
          },
        };
      }, {}),
      isSubmitting: false,
      touched: Object.keys(props.initialValues).reduce((acc, key) => {
        return {
          ...(acc as any),
          [key]: false,
        };
      }, {}),
    };
  }

  public render() {
    return this.props.children({
      fields: Object.keys(this.state.fields).reduce(
        (acc, key) => {
          return {
            ...acc,
            [key]: {
              ...this.state.fields[key],
              id: key,
              onBlur: this.onBlur,
              onChange: this.onChange,
            },
          };
        },
        {} as any,
      ),
    });
  }

  private onChange = (event: React.ChangeEvent<any>) => {
    const { id, value } = event.currentTarget;
    this.setState(prevState => {
      return {
        ...prevState,
        errors: {
          ...(prevState.errors as any),
          [id]: this.props.validate
            ? typeof this.props.validate(this.props.initialValues)[id] ===
              'undefined'
            : true,
        },
        fields: {
          ...(prevState.fields as any),
          [id]: {
            ...prevState.fields[id],
            value,
          },
        },
      };
    });
  };

  private onBlur = (event: React.SyntheticEvent<any>) => {
    const { id } = event.currentTarget;
    this.setState(prevState => {
      return {
        ...prevState,
        touched: {
          ...(prevState.touched as any),
          [id]: true,
        },
      };
    });
  };
}

export function createTypedForm<T>() {
  type BoundForm = TypedForm<T>;
  return TypedForm as new () => BoundForm;
}
