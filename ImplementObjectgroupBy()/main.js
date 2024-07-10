/**
 * @template T
 * @template { keyof any } K
 * @param { Array<T> } items
 * @param { (item: T) => K } callback
 * @returns { Record<K, Array<T>> }
 */
function ObjectGroupBy(items, callbackFn) {
  // Your code here
  if (!Array.isArray(items)) {
    throw new Error("Please pass a array");
  }
  let map = {}; // Object.Create(null)
  map.__proto__ = null;
  for (let item of items) {
    const key = callbackFn(item);
    if (map[key] == undefined) {
      map[key] = [];
    }
    map[key].push(item);
  }
  return map;
}
