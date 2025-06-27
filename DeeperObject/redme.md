# 🧠 Simple Guide to `temp = temp[el]` in JavaScript

When building **nested objects dynamically**, we often use a pointer variable called `temp` to walk through each level of the object.

---

## ✅ Why Use `temp`?

- `resultObj` always points to the **top** of the object.
- `temp` helps us **go deeper** into the nested structure (like `user → address → city`).
- Without `temp`, you'd have to write hardcoded paths like `resultObj["user"]["address"]["city"]`.

---

## 🔁 What Does `temp = temp[el]` Do?

This line means:

> "Go one level deeper inside the object."

It **does not break** or copy anything — it just moves `temp` to point to the nested object.

---

## 🔧 Example

```js
let resultObj = {};
let temp = resultObj;

temp["user"] = {};        // resultObj = { user: {} }
temp = temp["user"];      // temp now points to resultObj.user

temp["name"] = "Pavan";   // resultObj = { user: { name: "Pavan" } }

✅ temp is still part of resultObj. Changing temp changes the original object.
```

🧠 Summary

```
temp is used to navigate nested levels.

temp = temp[el] means: go one level deeper.

Modifying temp still updates resultObj.

Useful for dynamic object creation from dot-separated strings.
```
