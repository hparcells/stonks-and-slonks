
/** Returns the first argument. If it is undefined or null, it throws an error. */
export function assertDefined<T>(arg: T | undefined | null): T {
  if (arg === undefined || arg === null) {
    throw new Error('Argument is not defined. Got ' + arg);
  }
  return arg;
}
