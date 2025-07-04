# 📌 Notes: Why `while` loop instead of `for` loop in flattenArray

When implementing a custom `flattenArray` method that uses a stack to handle nested arrays,
it's important to choose the correct type of loop to process the stack.

## ✅ Correct: `while (stack.length > 0)`

```js
while (stack.length > 0) {
  const [currentArr, currentDepth] = stack.pop();
  // Process each item and maybe push new nested arrays into the stack
}
```

---

The while loop dynamically checks the actual stack length at every step.

It keeps running until the stack is truly empty, even if you push new nested arrays while processing.

Correctly preserves LIFO (last-in, first-out) stack behavior.

---

# ⚠ Incorrect: for (let k=0; k<stack.length; k++)

```js
for (let k = 0; k < stack.length; k++) {
  const [currentArr, currentDepth] = stack.pop();
  // Process and maybe push new nested arrays
}
```

The loop uses a fixed index k which blindly keeps increasing (0,1,2,...).

When you pop() from the stack inside the loop, stack.length shrinks.

As soon as k becomes greater than or equal to the new stack.length, the loop stops early → it misses items.

If you push() new items inside the loop, they go to the end of the stack, but:

The loop doesn't automatically know to process them in the correct LIFO order.

You lose proper stack behavior.

---

```js

# 🧠 In short:

while (stack.length>0) → reacts dynamically; keeps running until the stack is really empty.

for loop → marches by index; ignores dynamic changes in stack length; order and completeness break.

Rule of thumb:
Use while (or for (;stack.length>0;) with pop) when processing dynamic stacks or queues
where you keep adding new work while iterating.

✅ This is why for a stack-based flatten function, we must use while (stack.length>0):

handles dynamic stack changes,

ensures no nested array is skipped,

and keeps correct LIFO order.
```
