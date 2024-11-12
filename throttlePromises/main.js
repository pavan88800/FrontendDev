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

// How They Work with max Parallel Tasks
// With while:

// It aggressively starts tasks until it reaches the max limit.
// If max = 3, while will start three tasks immediately in parallel on the first call to helper, ensuring that max tasks are running as soon as possible.

// With if:

// It starts tasks one by one, gradually filling each available slot until it reaches the max limit.
// For max = 3, if will initially start one task. When that task completes, if starts the next task, and so on, until there are three tasks running concurrently.

// Once it reaches max, if will keep three tasks running in parallel as others finish and new ones start.
// When Using while

// It immediately starts Task 1, Task 2, and Task 3 because the while loop fills up to max tasks right away.

// When any of these tasks complete, helper is called again, and it quickly starts the next available tasks (Task 4 or Task 5) if there’s an open slot.

// This approach is more aggressive and quickly fills up all available slots at each step, leading to faster completion.

// When Using if
// Only one task starts initially (Task 1).

// When Task 1 finishes, helper is called, and it checks if more slots are available, then starts Task 2. This continues gradually until all slots are filled.

// This approach is slower to start up to max concurrent tasks because it fills each slot one at a time.
