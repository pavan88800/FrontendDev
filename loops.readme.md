## 📝 Async/Await Support in Loops (Cheat Sheet)

## ✅ Loops that work with async/await (sequential)

## These pause each iteration until **await** finishes:

```js
for (let i = 0; i < arr.length; i++) { await ... }
for (const item of arr) { await ... }
for (const key in obj) { await ... }
while (condition) { await ... }
do { await ... } while (condition);
```

## 👉 These loops respect await → run one by one (sequential).

---

## ⚠️ Loops that don’t directly support async/await

These run synchronously and ignore your await (they just return promises immediately):

```js
arr.forEach(async item => { await ... })  // ❌ does not wait
arr.map(async item => { await ... })      // ❌ returns array of promises
arr.filter(async item => { await ... })   // ❌ does not wait, gives wrong results
arr.reduce(async (acc, item) => { await ... }) // ❌ tricky, returns promise chain
```

👉 With these, await inside works, but the outer loop won’t wait.

---

## ✅ How to fix map/forEach/filter/reduce with async?

Wrap with Promise.all to make them work in parallel:

```js
await Promise.all(arr.map(async item => { await ... }));
```

---

## ✅ The Only Loops That Natively Wait

for, for...of, for...in, while, do...while
👉 These respect await → run sequentially.

---

## 📝 Mantra:-

forEach / map / filter / reduce → run synchronously, don’t wait for async.

Use map + Promise.all for parallel async work.

Use for...of + await for sequential async work.
