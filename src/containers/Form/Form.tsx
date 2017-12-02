import * as React from 'react';
import { initForm, reducer, State, updateTouched, updateValue } from './state';

type FormContext<T> = State<T> & {
  fields: {
    [K in keyof T]: State<T>['fields'][K] & {
      id: string;
      onBlur: (event: React.SyntheticEvent<any>) => void;
      onChange: (event: React.ChangeEvent<any>) => void;
    }
  };
  onTouchField: (fieldName: keyof T) => void;
  onUpdateField: <K extends keyof T>(fieldName: K, value: T[K]) => void;
  onSubmit: (event: React.FormEvent<any>) => void | Promise<void>;
};

interface Props<T> {
  children: (context: FormContext<T>) => React.ReactNode;
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
}

export class Form<T> extends React.Component<Props<T>, State<T>> {
  public constructor(props: Props<T>) {
    super(props);

    this.state = reducer(
      {
        errors: {},
        fields: props.initialValues,
        isSubmitting: false,
        touched: Object.keys(props.initialValues).reduce(
          (acc, key) => ({
            ...acc,
            [key]: false,
          }),
          {},
        ),
      },
      initForm,
    );
  }

  public render() {
    return this.props.children({
      ...this.state,
      fields: Object.keys(this.state.fields).reduce((acc, key) => {
        return {
          ...(acc as any),
          [key]: {
            id: key,
            value: this.state.fields[key],
          },
        };
      }, {}),
      isSubmitting: false,
      onSubmit: this.onSubmit,
      onTouchField: this.onTouchField,
      onUpdateField: this.onUpdateField,
    });
  }

  private onTouchField = (fieldName: keyof T) => {
    this.setState(
      reducer(this.state, updateTouched({ fieldName, touched: true })),
    );
  };

  private onUpdateField = <K extends keyof T>(fieldName: K, value: T[K]) => {
    this.setState(reducer(this.state, updateValue({ fieldName, value })));
  };

  private onSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();
    this.props.onSubmit(this.state.fields);
  };
}
