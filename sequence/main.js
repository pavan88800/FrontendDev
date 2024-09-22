// TODO: It looks like you're trying to implement a sequence of asynchronous functions using a callback pattern. However, you cannot use await inside the forEach loop directly, as it doesn't support asynchronous operations in that way. Instead, you can use a for...of loop or the map method

// await only works  for, and for of loop, regular loop, and map
// important forEach doesn't work for async operations
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

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs) {
  // your code here
  let completed = 0;
  let currentIndex = 0;
  return function (callback, initialData) {
    function helper(res) {
      if (completed === funcs.length) {
        callback(undefined, res);
      } else {
        funcs[currentIndex++]((err, newData) => {
          if (err) {
            callback(err, undefined);
          } else {
            completed++;
            helper(newData);
          }
        }, res);
      }
    }
    helper(initialData);
  };
}

function sequence(funcs) {
  // your code here
  return async function (callback, initialData) {
    try {
      for (let el of funcs) {
        initialData = await new Promise((resolve, reject) => {
          el((err, newData) => {
            if (err) {
              reject(err);
            }
            resolve(newData);
          }, initialData);
        });
      }
      callback(undefined, initialData);
    } catch (err) {
      callback(err, undefined);
    }
  };
}

const asyncTimes2 = (callback, num) => {
  setTimeout(() => callback(null, num * 2), 100);
};

const asyncTimes4 = sequence([asyncTimes2, asyncTimes2]);
asyncTimes4((error, data) => {
  console.log(data); // 4
}, 1);
