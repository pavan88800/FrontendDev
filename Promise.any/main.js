// ❌ finally() should not be used here
// finally() executes regardless of success or failure, but we only want to count errors inside .catch().
// If a promise resolves, there's no need to increment isAllError.

function any(promises) {
  // your code here
  let isAllError = 0;
  const errorList = [];
  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          errorList[index] = err;
          isAllError++;
          if (isAllError === promises.length) {
            reject(new AggregateError(errorList, "All promises were rejected"));
          }
        });
    });
  });
}
