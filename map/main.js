Array.prototype.myMap = function (cb) {
  if (typeof cb !== "function") {
    throw new TypeError(`${cb} must be a function`);
  }
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(cb(this[i], i, this));
    }
  }
  return result;
};
