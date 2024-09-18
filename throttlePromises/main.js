function throttlePromises(funcs, max) {
  return new Promise((resolve, reject) => {
    const result = [];
    let currentIndex = 0;
    let activePromises = 0;
    let count = 0;
    function callNext() {
      if (count === funcs.length) {
        resolve(result);
      }
      while (activePromises < max && currentIndex < funcs.length) {
        activePromises++;
        funcs[currentIndex++]()
          .then((data) => {
            result[count++] = data;
            callNext();
            activePromises--;
          })
          .catch((err) => {
            reject(err);
          });
      }
    }
    callNext();
  });
}
