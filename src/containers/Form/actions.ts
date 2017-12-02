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

export function actionCreator<T>(type: symbol): ActionCreator<T> {
  return Object.assign(
    (payload: T) => {
      return { type, payload };
    },
    { type },
  );
}

export function isType<T>(
  action: AnyAction,
  creator: ActionCreator<T>,
): action is Action<T> {
  if (action.type === creator.type) {
    return true;
  }
  return false;
}
