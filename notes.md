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
