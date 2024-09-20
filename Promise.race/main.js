function createAsync() {
  const number = Math.floor(Math.random() * 10);

  return new Promise((resolve, reject) => {
    if (number < 4) {
      resolve(number);
    } else {
      reject(` ${number}`);
    }
  });
}
function PromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((item) => {
      Promise.resolve(item)
        .then((result) => {
          if (result) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
