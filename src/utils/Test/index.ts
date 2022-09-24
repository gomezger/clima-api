// eslint-disable-next-line node/no-unpublished-import
import { instance, when, mock } from 'ts-mockito';
import { container, InjectionToken } from 'tsyringe';

/**
 * change de result of the function with a promise of result
 * @param f {Function} function to mock
 * @param result {T} value to return
 */
export function mockAsyncFunction<T>(f: (...args: any) => Promise<T>, result: T): void {
  when(f).thenReturn(async () => result);
}
/**
 * change de result of the function with a result
 * @param f {Function} function to mock
 */
export function mockFunction<T>(f: (...args: any) => T, result: T): void {
  when(f).thenReturn(() => result);
}

/**
 * Return a mock class of classObject
 * @param classObject {T} class to mock
 */
export function mockClass<T>(clazz?: any): T {
  return mock(clazz);
}

/**
 * Register a mock class with the correct dependecy
 * @param token The InjectionToken that was intercepted
 * @param classObject The object that was resolved from the container
 */
export function registerMock<T>(token: InjectionToken<T>, classObject: T): void {
  container.register<T>(token, { useValue: instance(classObject) });
}


