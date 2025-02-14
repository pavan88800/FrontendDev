/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function isEqual(arg1, arg2, map = new Map()) {
  // primitive
  // most test it will take care
  // if (Object.is(arg1, arg2)) {
  //   return true;
  // }
  if (arg1 === arg2) {
    return true;
  }
  //circler object
  if (map.has(arg1) && map.get(arg1) === arg2) {
    return true;
  } else {
    map.set(arg1, arg2);
  }
  if (arg1 === null || arg2 === null) {
    return arg1 === null && arg2 === null;
  }
  // Array
  if (Array.isArray(arg1) && Array.isArray(arg2)) {
    if (arg1.length !== arg2.length) {
      return false;
    }
    for (let i = 0; i < arg1.length; i++) {
      let isSame = isEqual(arg1[i], arg2[i], map);
      if (!isSame) {
        return false;
      }
    }
    return true;
  }

  if (typeof arg1 === "object" && typeof arg2 === "object") {
    let objArg1 = Object.keys(arg1);
    let objArg2 = Object.keys(arg2);
    if (objArg1.length !== objArg2.length) {
      return false;
    }
    for (let key in arg1) {
      let isSame = isEqual(arg1[key], arg2[key], map);
      if (!isSame) {
        return false;
      }
    }
    return true;
  }
  return false;
}
