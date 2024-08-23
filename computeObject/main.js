const input = {
  A: (a, b, c) => a + b + c,
  B: (a, b, c) => a - b - c,
  C: (a, b, c) => a + b - c,
  D: {
    E: (a, b, c) => a + b + c
  }
};

function compute(obj, ...args) {
  function helper(input) {
    const map = {}; // important to note
    for (let key in input) {
      const value = input[key];
      if (typeof value === "object") {
        map[key] = helper(value); // important
      } else {
        map[key] = value(...args); // important
      }
    }
    return map;
  }
  return helper(obj);
}

console.log(compute(input, 1, 1, 1));

/**
 * {
 * A: 3,
 * B:1,
 * C:2,
 * D: {
 * E: 3
 * }
 *
 * }
 */
