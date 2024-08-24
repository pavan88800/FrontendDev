const mood = "Happy! ";

String.prototype.myRepeat = function (num) {
  const value = this;
  let result = "";
  for (let i = 0; i < num; i++) {
    result = result + value;
  }
  return result;
};

console.log(`I feel ${mood.myRepeat(3)}`);
console.log(`I feel ${mood.repeat(3)}`);
