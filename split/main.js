String.prototype.mySplit = function (delimiter) {
  const result = [];
  const string = this;
  if (delimiter === "") {
    return Array.from(string);
  }
  function helper(str, i) {
    if (i >= string.length) return;
    const index = str.indexOf(delimiter);
    if (index !== -1) {
      result.push(str.slice(0, index));
      helper(str.slice(index + delimiter.length), index + delimiter.length);
    } else {
      result.push(str.toString());
    }
  }
  helper(string, 0);
  return result;
};

console.log(str.mySplit("."));
