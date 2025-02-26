// 🚀 Key Takeaways
// ✔ throw err; stops function execution immediately ✅
// ✔ No further code inside the function runs after throw err 🚨
// ✔ Caller must handle the error or it will crash the app 🔥

function getNameById(id, callback) {
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;
  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime);
}
function mapLimit(input, limit, fn, callback) {
  let activeTask = 0;
  const allResults = [];
  let currentIndex = 0;

  function execute() {
    if (currentIndex === input.length) {
      callback(allResults);
    }
    while (activeTask < limit && currentIndex < input.length) {
      activeTask++;
      fn(input[currentIndex], (value) => {
        allResults[currentIndex++] = value;
        activeTask--;
        execute();
      });
    }
  }
  execute();
}

mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
  console.log("output:", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});

function mapLimit(input, limit, fn, callback) {
  let activeTask = 0;
  const allResults = [];
  let currentIndex = 0;

  function execute() {
    if (currentIndex === input.length) {
      callback(allResults);
    }
    if (activeTask < limit && currentIndex < input.length) {
      activeTask++;
      fn(input[currentIndex], (value) => {
        allResults[currentIndex++] = value;
        activeTask--;
        execute();
      });
    }
  }
  execute();
}

function chunk(arr, limit) {
  const result = [];
  let i = 0;
  while (i < arr.length) {
    result.push(arr.slice(i, limit + i));
    i = limit + i;
  }
  return result;
}

// this from greatFrontend question and answer
export default async function mapAsyncLimit(iterable, callbackFn, size) {
  let result = [];
  const batch = chunk(iterable, size);
  for (let items of batch) {
    const chunkResults = await Promise.all(
      items.map((el) => {
        return callbackFn(el);
      })
    );
    result = result.concat(chunkResults);
  }
  return result;
}

//TODO?? mutualFriends questions and answer
const mutualFriends = {
  a: ["b", "c"],
  b: ["d", "g"],
  d: ["p", "q"],
  l: ["x", "y"]
};

function findMutualFrn(mutualFriends, person) {
  const res = [];
  function helper(person) {
    const current = mutualFriends[person];
    if (current && current.length > 0) {
      for (let item of current) {
        res.push(item);
        helper(item);
      }
    }
  }
  helper(person);
  return res;
}

console.log(findMutualFrn(mutualFriends, "d"));
//TODO::::::::::
/// Example
function getNameById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 10);
  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime * 100);
}

// wrong
// iterateeFn(taskList[index], (res) => {
//   result[index] = res; // Store in order
//   completedCount++;
// });

// activeCount--;  // ❌ WRONG: This runs immediately, before the task is actually done
// processNext();  // ❌ WRONG: This runs immediately, leading to premature execution

//Correct
// iterateeFn(taskList[index], (res) => {
//   result[index] = res; // Store in order
//   completedCount++;
//   activeCount--;  // ✅ Decrement only when the async task finishes
//   processNext();  // ✅ Call next task only after the previous one completes
// });

// TODO: remember about async here when you will deal up the mapLimit

// try...catch inside loop	✅ Continues running even if a batch fails means reject also
// try...catch outside loop	❌ Stops execution completely on the first error means promise reject loop will stop execution

// TODO: always call activeCount and processNext() inside callback because they will execute immediately instead of waiting for the async task to complete.
/**
 * always call activeCount and processNext() inside callback because they will execute immediately instead of waiting for the async task to complete.
 */
//new
// 📌 currentIndex starts new tasks 🏃‍♂️
// 📌 isCompleted checks when all are finished ✅
// That’s why mapLimit needs both! 🚀

//TODO? this correct
function mapLimit(promise, maxLimit, iterateeFn, callback) {
  let activePromise = 0;
  let currentIndex = 0;
  let isCompleted = 0;
  const result = [];
  function promiseNext() {
    if (promise.length === isCompleted) {
      callback(result);
    }
    while (activePromise < maxLimit && currentIndex < promise.length) {
      activePromise++;
      const task = promise[currentIndex++];
      iterateeFn(task, (res) => {
        result[isCompleted++] = res;
        activePromise--;
        promiseNext();
      });
    }
  }
  promiseNext();
}

mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
  console.log("output: is ", allResults);
});

// using Promise.all
function getNameById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 10);
  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime * 200);
}
function chunk(promise, size) {
  const result = [];
  let i = 0;

  while (promise.length > i) {
    result.push(promise.slice(i, size + i));
    i = size + i;
  }
  return result;
}
async function mapLimit(promise, maxLimit, iterateeFn, callback) {
  const chunked = chunk(promise, maxLimit);
  const result = [];
  for (let item of chunked) {
    try {
      const data = await Promise.all(
        item.map(
          (entry) =>
            new Promise((resolve) => {
              return iterateeFn(entry, resolve);
            })
        )
      );
      result.push(...data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  callback(result);
}

mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
  console.log("output: is ", allResults);
});
