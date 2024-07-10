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
  return function (...args) {
    // leading
    let isLeadingInvoked = false;
    if (option.leading && timer === null) {
      func.call(this, ...args);
      isLeadingInvoked = true;
    }

    if (timer) {
      clearTimeout(timer);
    }
    // trailing
    timer = setTimeout(() => {
      if (option.trailing && !isLeadingInvoked) {
        func.call(this, ...args);
      }
      timer = null;
    }, wait);
  };
}
