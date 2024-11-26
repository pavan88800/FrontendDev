function timeoutPromise(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Operation timed out")), ms)
  );
}

function runWithTimeout(promises, timeout) {
  return Promise.race([Promise.all(promises), timeoutPromise(timeout)]);
}

runWithTimeout(PromiseArray, 5000)
  .then((results) => console.log("Results:", results))
  .catch((error) => console.error("Error:", error.message));
