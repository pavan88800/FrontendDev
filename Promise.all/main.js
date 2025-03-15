// Conclusion
// 🔴 Don't use index === promise.length - 1 because:

// It assumes promises resolve in order, which is not true.
// It may call resolve(result) too early, leading to incomplete results.
// ✅ Use isCompleted === promises.length because:

// It tracks actual completion, ensuring resolve(result) happens only after all promises finish.
// It works even if promises complete in random order.
// Now your Promise.MyAll() works exactly like Promise.all()

// 🔹---------- Quick Rule of Thumb:----------
// Use Promise.all() → When all API calls can be made simultaneously without waiting for the others. (Faster execution)
// Avoid Promise.all() → When one API call depends on the result of another. (Use sequential await instead)

function all(promises) {
  // your code here
  const result = [];
  let completed = 0;
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve(result);
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => {
          result[index] = data;
          completed++;
          if (completed === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

function all(promises) {
  // your code here
  const result = [];
  const isCompleted = 0;
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return resolve(result);
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => {
          result[index] = data;
          isCompleted++;
          if (isCompleted === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
