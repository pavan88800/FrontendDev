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
