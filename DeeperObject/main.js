{
  /* <form id="parent">
  <input class="in" name="foo.bat" type="text" value="1" />
  <input class="in" name="pavan.bar.baz" type="text" value="2" />
  <input class="in" type="text" name="foo.bar.twenty" value="20" />
  <input class="in" name="fizz" type="text" value="100" />
</form>; */
}

# 📌 Understanding `temp = temp[el]` in Nested Object Construction

## ✅ Why we use `temp`

When building deeply nested objects from paths like `"user.address.city"`, we use a temporary pointer `temp` to:

- Navigate level-by-level into the object.
- Dynamically build nested structures.
- Keep `resultObj` pointing to the root, while `temp` walks inside.

---

## 🔁 What `temp = temp[el]` does

This line **moves the `temp` pointer one level deeper** in the object.

### Example:
```js
let resultObj = {};
let temp = resultObj;

temp["user"] = {};       // resultObj = { user: {} }
temp = temp["user"];     // temp now points to resultObj.user

temp["name"] = "Pavan";  // modifies resultObj.user.name


function solution() {
  const inputs = document.querySelectorAll("input");
  let result = {};
  inputs.forEach((el) => {
    const { name, value } = el;
    let temp = result;
    const path = name.split(".");
    path.forEach((el, index) => {
      const key = el;
      if (!temp[key]) {
        temp[key] = {};
      }
      if (path.length - 1 === index) {
        temp[key] = value;
      }
      temp = temp[key];
    });
  });
  return result;
}

console.log(solution());
