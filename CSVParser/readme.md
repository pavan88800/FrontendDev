## 📝 CSV Parser in JS

1. Loop Execution Flow

`**for (let i = 1; i < rows.length; i++)**`

Starts at i = 1 (skips header).

Runs until rows.length.

## Inside each iteration:

1. Create a new empty records = {}.

2. header.forEach(...) fills records.

3. After forEach ends, destructure records into variables.

4. Convert quantity & price into numbers.

5. Update userMap.

6. Push purchase object.

7. Then → i++ → next row.

## ✅ Key Rule: Inner forEach always completes fully before moving forward.

---

## 2. Object Creation vs Reference

records = {} → new object every iteration.

userMap = {} → created once, reused across all rows.

Updating userMap[userId] doesn’t replace userMap, it just adds/updates a key.

---

## 3. Reference Behavior

Objects/arrays in JS are reference types.

If you modify userMap[userId].purchases, it affects the same object stored in memory.

That’s why all purchases for the same userId go into the same array.

---

## 4. Destructuring & Conversion

const { quantity, price, userId, name, item } = records;
Extracts values into separate variables.

Number(quantity) → always check for NaN if input may be invalid.

Computed values (qty \* prices) happen before pushing into purchases.

## 5 Important Gotchas to Remember

Split Issue:
You used split(", ") (comma + space).
If CSV doesn’t have a space after comma, it will break.
✅ Safer: split(",") and trim() values.

Data Validation:
Number("abc") → NaN.
You may need to handle invalid numbers.

Duplicate Handling:
Purchases are always pushed → no merging logic for same item.
(If required, you’d sum quantities instead.)

Scalability:
Works fine for small CSVs. For huge files, better use a streaming parser.

---

## 6 Interview-Level Insights

for loop vs forEach:

for gives control over index & break/continue.

forEach runs all items (can’t break early).

Why userMap?

Faster lookup by userId compared to filtering arrays.

Then converted to array at the end.

Time Complexity:

Outer loop → O(n) for rows.

Inner forEach → O(m) for headers.

Total → O(n × m).

Space Complexity:

userMap stores all records → O(n).

---

🔄 How for and forEach Work (Step by Step)

1. for loop

```js
for (let i = 1; i < rows.length; i++) {
  // body of loop
}
```

## Execution Flow:

1. Init → let i = 1 runs only once at start.

2. Condition check → `**i < rows.length**`.
   . If true → run loop body.
   . If false → exit loop.

3. Run body → executes your code (creates `**records1**`, runs `**forEach**`, etc).

4. Increment step → `**i++**` happens AFTER loop body finishes completely.

5. Go back to condition check, repeat.

## 👉 Golden Rule: In for, the i++ happens after the entire body (including any forEach inside) finishes.

---

## 2. forEach loop:

```js
header.forEach((item, index) => {
  records[item] = list[index];
});
```

Execution Flow:

1. Takes the array (header).

2. Runs the callback once per element:
   . First call: item = "userId", index = 0.
   . Second call: item = "name", index = 1.
   . … continues until last element.

3. No manual i++ here. JS engine automatically moves to the next element.

4. After the last header element → forEach finishes completely.

## After forEach:

Control returns to the next line inside the for body (not to i++ yet). `** keep in mind for loop body not to i++ yet.**`

Executes destructuring (const { quantity, price, ... } = records;).

Converts values: (Number(quantity), Number(price)).

Checks and updates userMap.

Pushes purchase.

## ✅ Only after finishing the entire block → outer for does i++.

---
