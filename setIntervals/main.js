function CreateSetInterval() {
  let timerMap = {};
  let timer = 1;
  function mySetInterVal(callback, delay) {
    let idx = timer++;
    function helper(...args) {
      timerMap[idx] = setTimeout(function () {
        if (!timerMap[id]) return;
        callback(...args);
        if (timerMap[idx]) {
          helper();
        }
      }, delay);
    }
    helper();
    return idx;
  }

  function ClearMySetInterval(idx) {
    delete timerMap[idx];
  }

  return { mySetInterVal, ClearMySetInterval };
}

const { mySetInterVal, ClearMySetInterval } = CreateSetInterval();
let count = 0;
let id = mySetInterVal(() => {
  console.log("object", "1");
  count++;
  if (count === 2) {
    console.log(count);
    ClearMySetInterval(id);
  }
}, 5000);
