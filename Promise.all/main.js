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
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(result);
          }
        });
    });
  });
}
