import * as React from 'react';
import {
  createReducer,
  Errors,
  initForm,
  Reducer,
  State,
  submitFailure,
  submitRequest,
  submitSuccess,
  updateDirty,
  updateErrors,
  updateTouched,
  updateValue,
} from '../state';
import { isPromise } from './lib/isPromise';

/**
 * The context that's passed down to the child prop
 * which contains all of the finalized form data.
 */
export type FormContext<T> = State<T> & {
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
  onTouchField: (fieldName: keyof T, touched: boolean) => void;
  onUpdateField: <K extends keyof T>(fieldName: K, value: T[K]) => void;
  onReset: () => void;
  onSubmit: (event: React.FormEvent<any>) => void | Promise<void>;
};

/**
 * Props passed to the Form container
 */
interface Props<T> {
  children: (context: FormContext<T>) => React.ReactNode;
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => Errors<T>;
}

/**
 * The Form container.
 *
 * This manages the form state and provides helpers for updating,
 * all passed down to the child component tree through a render prop.
 *
 * @export
 */
export class Form<T> extends React.PureComponent<Props<T>, State<T>> {
  /**
   * The snapshot is a clone of the state object that we can use
   * to rehydrate on resetting.
   */
  private snapshot: State<T>;

  /**
   * The instance of the typed reducer we're using to manage
   * the form state.
   */
  private reduce: Reducer<State<T>>;

  /**
   * A snapshot of all of the fieldName set to false.
   * Used for the initial dirty and touched states.
   */
  private falseObject: { [K in keyof T]: false };

  /**
   * We're going to initialize the initial state and set
   * it to the snapshot
   *
   * @param props
   */
  public constructor(props: Props<T>) {
    super(props);

    this.reduce = createReducer<T>();

    this.falseObject = Object.keys(props.initialValues).reduce(
      (acc, key) => ({
        ...(acc as any),
        [key]: false,
      }),
      {},
    );

    this.state = this.reduce(
      {
        dirty: this.falseObject,
        errors: props.validate ? props.validate(props.initialValues) : {},
        fields: props.initialValues,
        isSubmitting: false,
        touched: this.falseObject,
      },
      initForm,
    );

    this.snapshot = { ...this.state };
  }

  /**
   * We're generating the form context in the render method as
   * it's passed down to the children. No new methods are created here,
   * we simply reference the pre-bound methods attached to the class.
   */
  public render() {
    return this.props.children({
      ...this.state,
      fields: Object.keys(this.state.fields)
        .map(fieldName => ({
          id: fieldName,
          onBlur: this.onBlur,
          onChange: this.onChange,
          value: this.state.fields[fieldName],
        }))
        .reduce(
          (acc, value) => ({
            ...(acc as any),
            [value.id]: value,
          }),
          {},
        ),
      isDirty: Object.keys(this.state.dirty)
        .map(f => this.state.dirty[f] === true)
        .some(f => f === true),
      isValid: Object.keys(this.state.errors).length === 0,
      onReset: this.onReset,
      onSubmit: this.onSubmit,
      onTouchField: this.onTouchField,
      onUpdateField: this.onUpdateField,
    });
  }

  /**
   * The bound onChange handler. This reads the id from the event as well as
   * the value and proxies onUpdateValue
   *
   * @param event React.ChangeEvent<any>
   */
  private onChange = ({
    currentTarget: { id, value },
  }: React.ChangeEvent<any>) => {
    this.onUpdateField(id, value);
  };

  /**
   * The bound onBlur handler. This reads the id from the event
   * and proxies onTouchField
   *
   * @param event React.ChangeEvent<any>
   */
  private onBlur = ({ currentTarget: { id } }: React.FormEvent<any>) => {
    this.onTouchField(id, true);
  };

  /**
   * This invokes reducers to set the touched value of the field.
   *
   * @param fieldName string
   * @param touched boolean
   */
  private onTouchField = (fieldName: keyof T, touched: boolean) => {
    this.setState(state =>
      this.reduce(state, updateTouched({ fieldName, touched })),
    );
  };

  /**
   * A set of reduer invocations to update a field.
   * Here we first update the values, then set the field to dirty,
   * and then generate validations if applicable.
   *
   * @param fieldName string
   * @param value any
   */
  private onUpdateField = <K extends keyof T>(fieldName: K, value: T[K]) => {
    let nextState = this.reduce(this.state, updateValue({ fieldName, value }));
    nextState = this.reduce(nextState, updateDirty({ fieldName, dirty: true }));

    if (typeof this.props.validate === 'function') {
      const errors = this.props.validate(nextState.fields);
      nextState = this.reduce(nextState, updateErrors(errors));
    }

    this.setState(nextState);
  };

  /**
   * Submit the form. After submission, if successful, reset
   * the state of the form to clean and create a new snapshot.
   */
  private onSubmit = async (event: React.FormEvent<any>) => {
    event.preventDefault();

    let nextState = { ...this.state };

    nextState = this.reduce(nextState, submitRequest());

    try {
      const submitting = this.props.onSubmit(this.state.fields);
      if (isPromise(submitting)) {
        const response = await submitting;
        nextState = this.reduce(nextState, submitSuccess(response));
      } else {
        nextState = this.reduce(nextState, submitSuccess(true));
      }
    } catch (err) {
      nextState = this.reduce(nextState, submitFailure(err.message));
    }

    Object.keys(nextState.fields).forEach(fieldName => {
      nextState = this.reduce(
        nextState,
        updateTouched({ fieldName, touched: false }),
      );
      nextState = this.reduce(
        nextState,
        updateDirty({ fieldName, dirty: false }),
      );
    });

    this.setState(nextState, () => {
      this.snapshot = nextState;
    });
  };

  /**
   * Resets the form to a previous snapshot.
   */
  private onReset = () => {
    this.setState(this.snapshot);
  };
}
