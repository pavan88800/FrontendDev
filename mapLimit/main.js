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
        execute();
      });
    }
    activeTask--;
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
        execute();
      });
    }
    activeTask--;
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
