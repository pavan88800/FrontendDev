// TODO: for parallel does use async await because async wait until the promise is resolved or rejected
// TODO: this means sequence
// TODO: recursion also sequence does use in the parallel

// Yes, that's correct! When you run asynchronous operations in parallel, they do not wait for each other to complete. Instead, they start executing simultaneously, and the program continues without pausing for any of the operations to finish.

// parallel does not await for previous state it keep going
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
