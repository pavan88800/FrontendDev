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
