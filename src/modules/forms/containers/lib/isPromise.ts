export function isPromise<T = any>(obj: any): obj is Promise<T> {
  if (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  ) {
    return true;
  }

  return false;
}
