String.prototype.mySplit = function (delimiter) {
  const result = [];
  const string = this;
  if (delimiter === "") {
    return Array.from(string);
  }
  function helper(str) {
    const index = str.indexOf(delimiter);
    if (index !== -1) {
      console.log(index);
      result.push(str.slice(0, index));
      helper(str.slice(index + delimiter.length));
    } else {
      result.push(str.toString());
    }
  }
  helper(string);
  return result;
};

console.log(str.mySplit("."));
