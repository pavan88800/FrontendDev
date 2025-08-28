## 🚀 JavaScript NaN Notes

🔹 isNaN(value) (loose check)

. Tries to convert the value to a number first.

. Returns true if the result of conversion is NaN.

👉 Examples:

```js
isNaN("12"); // false ("12" → 12 → valid number)
isNaN("hello"); // true  ("hello" → NaN)
isNaN(undefined); // true  (undefined → NaN)
isNaN(NaN); // true
```

---

🔹 Number.isNaN(value) (strict check)

. Does NOT convert the value.

. Returns true only if the value is exactly NaN.

👉 Examples:

```js
Number.isNaN("12"); // false  (string, not NaN)
Number.isNaN("hello"); // false  (string, not NaN)
Number.isNaN(undefined); // false  (undefined, not NaN)
Number.isNaN(NaN); // true   ✅
```

## ⚡ Extra Weird Fact to remember:

```js
NaN === NaN; // false ❌ (special JS rule)
```
