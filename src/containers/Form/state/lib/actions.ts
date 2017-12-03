export interface AnyAction {
  type: symbol;
}

interface Action<T> {
  type: symbol;
  payload: T;
}

interface ActionCreator<T> {
  type: symbol;
  (payload: T): Action<T>;
}

interface EmptyActionCreator extends ActionCreator<void> {
  (payload?: void): Action<void>;
}

interface ActionCreatorFactory {
  (type: symbol): EmptyActionCreator;
  <P>(type: symbol): ActionCreator<P>;
}

export const actionCreator: ActionCreatorFactory = <T = void>(type: symbol) => {
  return Object.assign(
    (payload: T) => {
      return { type, payload };
    },
    { type },
  );
};

export function isType<T>(
  action: AnyAction,
  creator: ActionCreator<T>,
): action is Action<T> {
  if (action.type === creator.type) {
    return true;
  }
  return false;
}
