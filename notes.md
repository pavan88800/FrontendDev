# Async Tasks: `index` vs `completed`

## The Simple Rule

```
Sequential (one at a time) → Use ONLY `completed`
Parallel (multiple at once) → Use BOTH `index` + `completed`
```

---

## Pattern 1: Sequential Tasks (One at a Time)

**Only need `completed`**

```javascript
function sequential(tasks, callback) {
  let completed = 0;

  function next() {
    if (completed === tasks.length) {
      callback();
      return;
    }

    tasks[completed]().finally(() => {
      completed++;
      next();
    });
  }
  next();
}
```

**Why?** Tasks run one by one, so `completed` works as both the index and counter.

---

## Pattern 2: Parallel Tasks (Multiple at Once)

**Need both `index` and `completed`**

```javascript
function parallel(tasks, limit, callback) {
  let index = 0; // Which to START
  let completed = 0; // How many FINISHED

  function start() {
    while (index < tasks.length && index - completed < limit) {
      let i = index++;

      tasks[i]().finally(() => {
        completed++;
        if (completed === tasks.length) {
          callback();
        } else {
          start();
        }
      });
    }
  }
  start();
}
```

**Why?** Multiple tasks run at once, so what you START (`index`) is different from what FINISHED (`completed`).

---

## When to Check Completion?

```javascript
// ✅ CORRECT: After all tasks finish
if (completed === tasks.length) {
  callback();
}

// ❌ WRONG: This fires too early (before last task finishes)
if (completed === tasks.length - 1) {
  callback();
}
```

---

## Quick Mental Model

**Sequential:**

```
Start Task 0 → Wait → Finish → Start Task 1 → Wait → Finish → ...
(completed = 0)        (completed = 1)        (completed = 2)
```

Only need **one counter** because starting and finishing happen together.

**Parallel:**

```
Start Task 0, 1, 2 (index = 3) → Task 1 finishes (completed = 1)
                               → Task 0 finishes (completed = 2)
                               → Start Task 3 (index = 4)
```

Need **two counters** because starting happens faster than finishing.

---

## That's It!

Remember:

- **One at a time?** → Use `completed` only
- **Multiple at once?** → Use `index` + `completed`
- **Always check:** `completed === tasks.length` to finish

---

✅ Sequential = 1 variable (completed)
✅ Parallel = 2 variables (index + completed)
✅ Always use tasks.length not tasks.length - 1
Just remember the mental model - if tasks wait for each other, use one counter. If they run together, you need two counters to track what started vs what finished! 🔥

---

# Async `try/catch` in Loops – Simple & Interview‑Safe

---

## `try/catch` **outside** the loop → loop **stops**

If you put **one `try/catch` outside (above) the loop**, the loop will **stop on the first rejected promise**.

### Why?

Because the rejection is **no longer handled per iteration**.
Once an await throws and it isn’t caught inside the loop, execution jumps to the outer catch and the loop **exits immediately**.

### Example

```js
async function run(tasks) {
  try {
    for (let task of tasks) {
      const result = await task();
      console.log(result);
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
```

**Behavior**

- Task 1 ✅ runs
- Task 2 ❌ rejects
- Loop ❌ stops
- Task 3 🚫 never runs

---

## `try/catch` **inside** the loop → loop **continues**

If you put `try/catch` **inside the loop**, the loop **will not stop** when a promise rejects.

### Why?

Because each iteration **handles its own promise**.
**await** **throws, it’s caught inside the loop, so the loop continues.” ✅**.

### Example

```js
async function run(tasks) {
  for (let task of tasks) {
    try {
      const result = await task();
      console.log(result);
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
```

**Behavior**

- Task 1 ✅ runs
- Task 2 ❌ rejects
- Task 3 ✅ still runs

---

## One‑line rule (remember this)

> `await` throws → **nearest `try/catch` decides whether the loop continues or stops**.

---

## Takeaway

- `try/catch` placement controls **flow**, not just error handling
- **Inside loop** → continue on error
- **Outside loop** → fail fast

That’s it. Clean. Interview‑safe. 💯
