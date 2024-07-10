// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
  // your code here
  let isClicked = false;
  let last = null;
  return function (...args) {
    if (!isClicked) {
      func.call(this, ...args);
      isClicked = true;
      setTimeout(() => {
        isClicked = false;
        if (last) {
          func.call(this, ...last);
        }
      }, wait);
    } else {
      last = args;
    }
  };
}
