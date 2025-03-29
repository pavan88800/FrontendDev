function reverseVowels(letter) {
  const findVowels = new Set(["a", "e", "i", "o", "u"]);
  const vowels = [];
  let word = letter.split("");
  for (let i = 0; i < word.length; i++) {
    if (findVowels.has(word[i])) {
      vowels.push(word[i]);
    }
  }
  for (let i = 0; i < word.length; i++) {
    if (findVowels.has(word[i])) {
      let value = vowels.pop();
      word[i] = value;
    }
  }
  return word.join("");
}
console.log(reverseVowels(letter));

// always remember string immutable  meaning their individual characters cannot be changed after the string is created.
let str = "pavan";
let word = str.split("");
word[0] = "";
console.log(word.join(""));
