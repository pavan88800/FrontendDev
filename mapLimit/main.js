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
