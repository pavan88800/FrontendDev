const arr = [21, 2, 3, 4, [[3], [4]]];

// recursion
Array.prototype.myFlat = function (depth = 1) {
  const result = [];
  let arr = this;
  function helper(arr, current = 0) {
    for (let item of arr) {
      if (Array.isArray(item) && current < depth) {
        helper(item, current + 1);
      } else {
        result.push(item);
      }
    }
  }
  helper(arr);
  return result;
};

// using stack
Array.prototype.myFlat = function (depth = 1, current = 0) {
  const result = [];
  let arr = this;
  const stack = [[arr, current]];
  while (stack.length > 0) {
    const [arr, current] = stack.pop();
    for (let val of arr) {
      if (Array.isArray(val) && current < depth) {
        stack.push([val, current + 1]);
      } else {
        result.push(val);
      }
    }
  }
  return result;
};

console.log(arr.myFlat(2));
console.log(arr.flat(2));
