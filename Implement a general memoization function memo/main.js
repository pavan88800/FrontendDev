/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
function memo(func, resolver) {
  // your code here
  let store = {};
  return function (...args) {
    const cacheValue = resolver ? resolver(...args) : args;
    if (store[cacheValue] !== undefined) {
      return store[cacheValue];
    } else {
      const result = func.call(this, ...args);
      store[cacheValue] = result;
      return result;
    }
  };
}
