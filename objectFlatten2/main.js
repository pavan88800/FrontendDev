const obj1 = {
  a: 1,
  b: 2,
  c: {
    h: 1,
    d: {
      e: 5,
      f: 6
    },
    j: [1, 2, 3]
  }
};

// object
const result = [];
function flattenObj(obj, append = "") {
  for (let key in obj) {
    const value = obj[key];
    const queryString = append + key;
    if (typeof value === "object" && !Array.isArray(value)) {
      flattenObj(value, queryString + ".");
    } else {
      result.push(`${queryString}=${value}`);
    }
  }
  return result.join("&");
}

// stack
function flattenObj(obj, append = "") {
  const stack = [[obj, append]];
  while (stack.length > 0) {
    const [obj, append] = stack.pop();
    for (let key in obj) {
      const value = obj[key];
      let queryString = append + key;
      if (typeof value === "object" && !Array.isArray(value)) {
        stack.push([value, queryString + "."]);
      } else {
        result.push(`${queryString}=${value}`);
      }
    }
  }
  return result.join("&");
}

console.log(flattenObj(obj1));
