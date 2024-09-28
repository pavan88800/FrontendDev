// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
function debounce(func, wait, option = { leading: false, trailing: true }) {
  // your code here
  let timer = null;
  let isLeadingInvoked;
  return function (...args) {
    // leading
    if (timer === null && option.leading) {
      func.call(this, ...args);
      isLeadingInvoked = true;
    } else {
      isLeadingInvoked = false;
    }
    // trailing
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!isLeadingInvoked && option.trailing) {
        func.call(this, ...args);
      }
      timer = null;
    }, wait);
  };
}
