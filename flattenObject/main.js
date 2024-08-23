const obj1 = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56
    },
    Q: [1, 2]
  }
};

// using stack
function flattenObj(obj) {
  let stack = [[{ obj, append: "" }]];
  const result = {};
  while (stack.length > 0) {
    const [{ obj, append }] = stack.pop();
    for (let key in obj) {
      let value = obj[key];
      let queryString = append + key;
      if (typeof value === "object") {
        stack.push([{ obj: value, append: queryString + "." }]);
      } else {
        result[queryString] = value;
      }
    }
  }
  return result;
}

// object method
function flattenObj(obj) {
  let map = {};
  function helper(input, append = "") {
    for (let key in input) {
      const value = input[key];
      const queryString = append + key;
      if (typeof value === "object") {
        helper(value, queryString + ".");
      } else {
        map[queryString] = value;
      }
    }
  }
  helper(obj);
  return map;
}

console.log(flattenObj(obj1));
