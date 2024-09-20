/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
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
          result[index] = {
            status: "fulfilled",
            value: data
          };
        })
        .catch((err) => {
          result[index] = {
            status: "rejected",
            reason: err
          };
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
