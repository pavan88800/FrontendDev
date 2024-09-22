function parallel(task, callback) {
  const result = [];
  const errors = [];
  let completed = 0;

  for (let promise of task) {
    promise
      .then((data) => {
        result.push(data);
      })
      .catch((err) => {
        errors.push(err);
      })
      .finally(() => {
        completed++;
        if (task.length === completed) {
          callback(errors, result);
        }
      });
  }
}

parallel(
  [createAsync(), createAsync(), createAsync(), createAsync(), createAsync()],
  (error, success) => {
    console.log("error", error);
    console.log("success", success);
  }
);

function parallel(funcs) {
  // your code here
  const result = [];
  let taskCompleted = 0;
  let isHasError = false;
  return function (callback, initialData) {
    let res = initialData;
    funcs.forEach((promise, index) => {
      promise((err, newData) => {
        if (isHasError) return;
        if (err) {
          isHasError = true;
          callback(err, undefined);
        } else {
          result[index] = newData;
          taskCompleted++;
        }
        if (taskCompleted === funcs.length) {
          callback(undefined, result);
        }
      }, res);
    });
  };
}
