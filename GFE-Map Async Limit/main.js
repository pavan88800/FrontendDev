export default function mapAsyncLimit(iterable, callbackFn, size) {
  const results = new Array(iterable.length);
  let activePromise = 0;
  let index = 0;
  let completed = 0;

  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      resolve(results);
    }
    const limit = size > 0 ? size : iterable.length;

    function runNextTask() {
      if (completed === iterable.length) {
        resolve(results);
        return;
      }
      while (activePromise < limit && index < iterable.length) {
        activePromise++;
        const currentIndex = index;
        const task = iterable[index++];
        callbackFn(task)
          .then((data) => {
            results[currentIndex] = data;
            completed++;
            activePromise--;
            runNextTask();
          })
          .catch((err) => {
            reject(err);
          });
      }
    }
    runNextTask();
  });
}
