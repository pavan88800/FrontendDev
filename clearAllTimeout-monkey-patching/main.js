/**
 * cancel all timer from window.setTimeout
 */
function clearAllTimeout() {
  // your code here
  const idx = [];
  const originalSetTimeout = window.setTimeout;
  window.setTimeout = function (callback, delay) {
    let id = originalSetTimeout(callback, delay);
    idx.push(id);
    return id;
  };
  window.clearAllTimeout = function () {
    while (idx.length > 0) {
      clearTimeout(idx.pop());
    }
  };
}

(function () {
  const originalSetTimeout = window.setTimeout;
  const originalClearTimeout = window.clearTimeout;
  const timeoutIds = new Set();
  window.setTimeout = function (cb, delay, ...args) {
    if (typeof cb !== "function") {
      throw new TypeError("Callback must be a function");
    }
    let id = originalSetTimeout(cb, delay, ...args);
    timeoutIds.add(id);
    return id;
  };

  window.clearTimeout = function (id) {
    timeoutIds.delete(id);
    originalClearTimeout(id);
  };
  window.clearAllTimeout = function () {
    timeoutIds.forEach((id) => originalClearTimeout(id));
    timeoutIds.clear();
  };
})();
