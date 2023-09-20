/**
 * Modelling the Result Enum as a union of Tuple types.
 * The Ok variant is represented as [Ok,null]
 * The Err variant is represented as [null,Err]
 */
type Result<T, E extends Error> = [T, null] | [null, E];

/**
 * Two approaces to get a Result type from a throwing function:
 * 1. HOF that invokes the function on your behalf and retruns a Result
 * 2. A factory function that returns another function, which when invoked returns a Result
 */

/**
 * Approach 1
 * Synchronous Version
 */
export function intoResult<T extends (...args: any[]) => any, E extends Error = Error>(
  cb: T,
  ...args: Parameters<T>
): Result<ReturnType<T>, E> {
  try {
    const res = cb(...args) as ReturnType<T>;
    return [res, null];
  } catch (e) {
    const err = e as E;
    return [null, err];
  }
}

/**
 * Approach 1
 * Asynchronous Version
 */
export async function intoResultAsync<
  T extends (...args: any[]) => Promise<any>,
  E extends Error = Error
>(cb: T, ...args: Parameters<T>): Promise<Result<Awaited<ReturnType<T>>, E>> {
  try {
    const res = (await cb(...args)) as Awaited<ReturnType<T>>;
    return [res, null];
  } catch (e) {
    const err = e as E;
    return [null, err];
  }
}

/**
 * Approach 2
 * Synchronous Version
 */
export function resultify<T extends (...args: any[]) => any>(cb: T) {
  return function <E extends Error = Error>(
    ...args: Parameters<T>
  ): Result<ReturnType<T>, E> {
    try {
      const res = cb(...args);
      return [res, null];
    } catch (e) {
      const err = e as E;
      return [null, err];
    }
  };
}

/**
 * Approach 2
 * Asynchronous Version
 */
export function resultifyAsync<T extends (...args: any[]) => Promise<any>>(cb: T) {
  return async function <E extends Error = Error>(
    ...args: Parameters<T>
  ): Promise<Result<Awaited<ReturnType<T>>, E>> {
    try {
      const res = await cb(...args);
      return [res, null];
    } catch (e) {
      const err = e as E;
      return [null, err];
    }
  };
}
