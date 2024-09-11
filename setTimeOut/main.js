const createSetTimeout = () => {
  let idx = 0;
  let timerMap = {};
  const mySetTimeout = (callback, delay) => {
    const id = idx++; // unique
    timerMap[id] = true;
    const start = Date.now() + delay;
    function helper(...args) {
      if (!timerMap[id]) return;
      if (Date.now() > start) {
        callback.call(this, ...args);
      } else {
        requestIdleCallback(helper);
      }
    }
    requestIdleCallback(helper);
    return id;
  };
  const myClearTimeout = (id) => {
    delete timerMap[id];
  };

  return { mySetTimeout, myClearTimeout };
};

const { mySetTimeout, myClearTimeout } = createSetTimeout();
