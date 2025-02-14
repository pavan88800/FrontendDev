//using Promise
class CanceledPromiseError extends Error {
  constructor() {
    super("Promise has been canceled");
    this.name = "CanceledPromiseError";
  }
}

Promise.cancelable = function (promise) {
  let isCancelled = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then((value) => {
        if (!isCancelled) {
          resolve(value);
        } else {
          reject(new CanceledPromiseError("Promise canceled"));
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          reject(err);
        }
      });
  });

  wrappedPromise.cancel = () => {
    isCancelled = true;
  };
  return wrappedPromise;
};

const asyncTask2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Task 2 completed");
  }, 3000);
});
const cancelableTask1 = Promise.cancelable(asyncTask2);

cancelableTask1
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

cancelableTask1.cancel();

//using function and setTimeOut
function controlPromise() {
  let isCanceled = false;
  let timer;
  const promiseObject = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      if (!isCanceled) {
        resolve("resolved data");
      }
    }, 2000);
  }).catch((err) => {
    if (!isCanceled) {
      reject(err);
    }
  });
  promiseObject.cancel = function () {
    isCanceled = true;
    clearTimeout(timer);
  };
  return promiseObject;
}

const promiseObject = controlPromise();

promiseObject.then((data) => {
  console.log(data);
});
promiseObject.cancel();
