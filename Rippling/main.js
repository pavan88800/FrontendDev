// question 1
x = 10;
foo = {
  x: 20,
  getX: function () {
    console.log(this.x);
  }
};

foo.getX();
const aa = foo.getX;
aa();

//question 2
const tempObj = {
  a: 20,
  b: {
    c: 20
  }
};

const clone1 = { ...tempObj };
const clone2 = JSON.parse(JSON.stringify(tempObj));
const clone3 = Object.assign({}, tempObj);
clone1.b.c = 30;
clone2.b.c = 50;
clone3.b.c = 150;
console.log(tempObj);

// question 3
/**
 * Arrow functions in JavaScript do not have their own arguments object. Instead, they inherit arguments from their enclosing function scope (if one exists).
 * Arrow functions do not have their own this keyword. They inherit this from the parent function (lexical scope).
 * Arrow functions do not have a prototype property. They cannot be used as constructors.
 * Arrow functions cannot be used with new. Since they lack a prototype, they cannot instantiate objects.
 * Arrow functions do not have their own super. They inherit super from their surrounding lexical context.
 * Arrow functions do not have implicit bind(), call(), or apply(). They cannot change their this context dynamically like regular functions.
 *
 */
var x = 10;
function temp() {
  let x = 20;
  const foo = () => {
    // arguments inherit from parent function
    console.log(this.x, arguments[0], x);
  };
  foo(20);
  foo(30);
  foo(20);
}
temp(40);

//Question 4 controlPromise promise
function controlPromise() {
  let isCanceled = false;
  let timer;
  const promiseObject = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      if (!isCanceled) {
        resolve("resolved data");
      }
    }, 2000);
  }).catch((err) => {
    if (!isCanceled) {
      reject(err);
    }
  });
  promiseObject.cancel = function () {
    isCanceled = true;
    clearTimeout(timer);
  };
  return promiseObject;
}

const promiseObject = controlPromise();

promiseObject.then((data) => {
  console.log(data);
});
promiseObject.cancel();

//question 5
function memo(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    } else {
      const result = fn.call(this, ...args);
      cache[key] = result;
      return result;
    }
  };
}
