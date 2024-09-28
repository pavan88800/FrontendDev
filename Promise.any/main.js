function any(promises) {
  // your code here
  const errorList = [];
  let allError = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          errorList[index] = err;
        })
        .finally(() => {
          allError++;
          if (promises.length === allError) {
            reject(
              new AggregateError(
                "No Promise in Promise.any was resolved",
                errorList
              )
            );
          }
        });
    });
  });
}

// Promise 2
function any(promises) {
  // your code here
  let isError = 0;
  const errorList = [];
  return new Promise((resolve, reject) => {
    promises.forEach((el, index) => {
      Promise.resolve(el)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          errorList[index] = err;
          isError++;
          if (promises.length === isError) {
            reject(new AggregateError(errorList, "All promises were rejected"));
          }
        });
    });
  });
}
