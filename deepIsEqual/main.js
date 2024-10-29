/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function isEqual(a, b) {
  const seenObject = new Map();

  function deepCompare(arg1, arg2) {
    // handle primitive
    if (arg1 === arg2) return true;

    if (seenObject.has(arg1) && seenObject.get(arg1) === arg2) {
      return true;
    } else {
      seenObject.set(arg1, arg2);
    }
    // handle array
    if (Array.isArray(arg1) && Array.isArray(arg2)) {
      if (arg1.length !== arg2.length) return false;
      for (let i = 0; i < arg1.length; i++) {
        if (!deepCompare(arg1[i], arg2[i])) return false;
      }
      return true;
    }
    // handle object
    if (typeof arg1 === "object" && typeof arg2 === "object") {
      const key1 = Object.keys(arg1);
      const key2 = Object.keys(arg2);
      if (key1.length !== key2.length) return false;
      for (let key of key1) {
        if (!deepCompare(arg1[key], arg2[key])) return false;
      }
      return true;
    }
    return false;
  }

  return deepCompare(a, b);
}
