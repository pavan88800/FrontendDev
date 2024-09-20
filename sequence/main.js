async function sequence(task, callback) {
  const result = [];
  const errors = [];

  for (let promise of task) {
    try {
      const res = await promise;
      result.push(res);
    } catch (error) {
      errors.push(error);
    }
  }
  callback(errors, result);
}

sequence(
  [createAsync(), createAsync(), createAsync(), createAsync(), createAsync()],
  (error, success) => {
    console.log("error", error);
    console.log("success", success);
  }
);
