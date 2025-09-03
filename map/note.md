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

`**i in this**` checks whether the index i exists as a property of the array object (this).

## What i in arr means

It checks if the index exists in the array (as a property).

✅ If it exists → true (even if the value is undefined).

❌ If it doesn’t exist → false (that’s a hole).

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

---

## 📝 Lifetime Note: How map Builds the Result

map never changes the original array.
It always builds a new array called result.

Each iteration does 3 steps:

Takes the current element (this[i]).

Passes it into your callback → cb(this[i], i, this).

Whatever the callback returns → gets pushed into result.

Result grows step by step.
Example with [1, 2, 3] and x \* 10:

Iteration 1 → returns 10 → result = [10]

Iteration 2 → returns 20 → result = [10, 20]

Iteration 3 → returns 30 → result = [10, 20, 30]

At the end → map returns the result array.

---

## How map runs:-

map is synchronous (normal JavaScript loop).

It goes one iteration at a time:

Runs the callback for the current element.

Waits for that callback to finish returning a value.

Pushes that return value into result.

Then moves to the next iteration.

It does not jump ahead — it always finishes the current iteration before moving on.

---
