const createSetTimeout = () => {
  let idx = 0;
  let timerMap = {}; //timerMap is used to track which setTimeout calls are currently active.
  const mySetTimeout = (callback, delay) => {
    if (typeof callback !== "function") {
      throw new TypeError(`${callback} must be a function`);
    }
    const id = idx++; // unique
    timerMap[id] = true;
    const start = Date.now() + delay;
    function helper(...args) {
      if (!timerMap[id]) return;
      if (Date.now() > start) {
        callback(...args);
      } else {
        requestIdleCallback(helper);
      }
    }
    requestIdleCallback(helper); // call this when browser is idle
    //NOTE: if you call this helper() directly it leads to infinite
    return id;
  };
  const myClearTimeout = (id) => {
    delete timerMap[id];
  };

  return { mySetTimeout, myClearTimeout };
};

const { mySetTimeout, myClearTimeout } = createSetTimeout();
