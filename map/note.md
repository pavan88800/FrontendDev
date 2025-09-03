## The Code...

```js
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
```

## 🛠 Explanation Step by Step

1. Array.prototype.myMap = function (cb) { ... }
   . You are adding a new method called myMap to all arrays by extending Array.prototype.
   . This means you can now call it like:

```js
[1, 2, 3].myMap((x) => x * 2); // [2, 4, 6]
```

---

## 2. Callback validation

```js
if (typeof cb !== "function") {
  throw new TypeError(`${cb} must be a function`);
}
```

The real map requires the first argument to be a function.

If it’s not, we throw an error.

Example:

```js
[1, 2, 3].myMap("hello");
// ❌ Throws: TypeError: hello must be a function
```

---

3. Preparing the result

```js
const result = [];
```

Just like the real map, we will build a new array and return it at the end.

Important: We never mutate the original array.

---

4. Looping over elements

```js
for (let i = 0; i < this.length; i++) {

```

this refers to the array on which myMap was called.

---

5. Checking for holes

```js
if (i in this) {
```

Key part: Arrays in JS can have holes (sparse arrays).

This check ensures that the index actually exists before using it.

Example:-

```js
const arr = [1, , 3];
arr.myMap((x) => x * 2); // [2, 6]
```

Index 1 is skipped, not treated as undefined.

---

6. Applying the callback

```js
result.push(cb(this[i], i, this));
```

We call the provided callback cb with:

this[i] → the element value

i → the current index

this → the entire array

Whatever the callback returns, we push into result.

Example:-

```js
[10, 20, 30].myMap((val, idx, arr) => {
  console.log(val, idx, arr);
  return val / 10;
});
// Logs:
// 10 0 [10,20,30]
// 20 1 [10,20,30]
// 30 2 [10,20,30]
// Returns: [1, 2, 3]
```

---

7. Returning the result

```js
return result;
```

. After the loop finishes, we return the newly built array.

---

## 🧠 Summary (How myMap works)

Validate the callback is a function.

Create a result array.

Loop through the array using indexes.

Skip holes (if (i in this)).

Run callback on each valid element → get transformed value.

Push result into the new array.

Return the new array (original array stays unchanged).

Example:-

```js
const nums = [1, , 3];
const doubled = nums.myMap((x) => x * 2);

console.log(doubled); // [2, 6]
console.log(nums); // [1, , 3] (unchanged)
```
