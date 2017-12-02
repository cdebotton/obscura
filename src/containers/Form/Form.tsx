import * as React from 'react';
import { Reducer } from './combineReducers';
import {
  createReducer,
  Errors,
  initForm,
  State,
  updateDirty,
  updateErrors,
  updateTouched,
  updateValue,
} from './state';

type FormContext<T> = State<T> & {
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  fields: {
    [K in keyof T]: {
      id: string;
      value: T[K];
      onBlur: (event: React.SyntheticEvent<any>) => void;
      onChange: (event: React.ChangeEvent<any>) => void;
    }
  };
  onTouchField: (fieldName: keyof T) => void;
  onUpdateField: <K extends keyof T>(fieldName: K, value: T[K]) => void;
  onReset: () => void;
  onSubmit: (event: React.FormEvent<any>) => void | Promise<void>;
};

interface Props<T> {
  children: (context: FormContext<T>) => React.ReactNode;
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => Errors<T>;
}

export class Form<T> extends React.PureComponent<Props<T>, State<T>> {
  private snapshot: State<T>;
  private reduce: Reducer<State<T>>;

  public constructor(props: Props<T>) {
    super(props);

    this.reduce = createReducer<T>();

    this.state = this.reduce(
      {
        errors: props.validate ? props.validate(props.initialValues) : {},
        fields: props.initialValues,
        isDirty: false,
        isSubmitting: false,
        touched: Object.keys(props.initialValues).reduce(
          (acc, key) => ({
            ...(acc as any),
            [key]: false,
          }),
          {},
        ),
      },
      initForm,
    );

    this.snapshot = this.state;
  }

  public render() {
    return this.props.children({
      ...this.state,
      fields: Object.keys(this.state.fields).reduce((acc, key) => {
        return {
          ...(acc as any),
          [key]: {
            id: key,
            onBlur: this.onBlur,
            onChange: this.onChange,
            value: this.state.fields[key],
          },
        };
      }, {}),
      isDirty: this.state.isDirty,
      isValid: Object.keys(this.state.errors).length === 0,
      onReset: this.onReset,
      onSubmit: this.onSubmit,
      onTouchField: this.onTouchField,
      onUpdateField: this.onUpdateField,
    });
  }

  private onChange = ({
    currentTarget: { id, value },
  }: React.ChangeEvent<any>) => {
    this.onUpdateField(id, value);
  };

  private onBlur = ({ currentTarget: { id } }: React.FormEvent<any>) => {
    this.onTouchField(id);
  };

  private onTouchField = (fieldName: keyof T) => {
    this.setState(state =>
      this.reduce(state, updateTouched({ fieldName, touched: true })),
    );
  };

  private onUpdateField = <K extends keyof T>(fieldName: K, value: T[K]) => {
    let nextState = this.reduce(this.state, updateValue({ fieldName, value }));
    nextState = this.reduce(nextState, updateDirty(true));

    if (typeof this.props.validate === 'function') {
      const errors = this.props.validate(nextState.fields);
      nextState = this.reduce(nextState, updateErrors(errors));
    }

    this.setState(nextState);
  };

  private onSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();

    this.setState(state => this.reduce(state, updateDirty(false)));

    this.props.onSubmit(this.state.fields);

    this.snapshot = this.state;
  };

  private onReset = () => {
    this.setState(this.snapshot);
  };
}
