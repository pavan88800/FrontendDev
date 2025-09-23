## Core Idea of Debounce

## NOTE : Debounce have a multiple fellowUp questions as well

Debounce ensures that a function (func) only runs after a certain delay (wait) since the last call.

If the debounced function is called multiple times quickly, the timer keeps resetting.

Only the last call actually triggers func.

```js
export default function debounce(func, wait) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(this, ...args);
    }, wait);
  };
}
```

---

## [greatFrontend] (https://www.greatfrontend.com/interviews/study/google/questions/javascript/debounce-ii)

```js
export default function debounce(func, wait) {
  let timer;
  let isCanceled = false;
  let lastArgs;
  let lastThis;

  const debouncedWrapper = function (...args) {
    if (isCanceled) return;

    if (timer) clearTimeout(timer); // Reset timer if called again
    lastArgs = args; // Store latest arguments
    lastThis = this; // Store latest `this` context

    timer = setTimeout(() => {
      func.apply(lastThis, lastArgs); // Call function after delay
    }, wait);
  };

  debouncedWrapper.cancel = function () {
    isCanceled = true; // Prevent future calls
    clearTimeout(timer); // Clear any pending execution
    timer = null;
  };

  debouncedWrapper.flush = function () {
    if (timer) {
      clearTimeout(timer); // Clear timer
      timer = null;
      func.apply(lastThis, lastArgs); // Immediately execute last call
    }
  };

  return debouncedWrapper;
}
```

---
