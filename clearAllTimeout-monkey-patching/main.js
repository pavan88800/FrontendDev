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
