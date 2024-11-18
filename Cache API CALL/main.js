// 1
function cachedApiCall(time) {
  const cachedApi = {};
  return function (url, config = {}) {
    const key = `${url}${JSON.stringify(config)}`;
    if (cachedApi[key] === undefined || Date.now() > cachedApi[key].expiry) {
      console.log("Making fresh api request");
      const promise = fetch(url, config).then((res) => res.json());
      cachedApi[key] = {
        result: promise,
        expiry: Date.now() + time
      };
      return promise;
    } else {
      console.log("getting cached values...");
      return cachedApi[key].result;
    }
  };
}

let call = cachedApiCall(1000);

call("https://jsonplaceholder.typicode.com/todos/1").then((data) => {
  console.log(data);
});

// 2
const cachedApiCall = () => {
  const cache = {};
  return async (url, config = {}) => {
    const key = url;
    const entry = cache[key];
    if (entry === undefined) {
      try {
        console.log("Making a fresh api call");
        let promise = await fetch(url, config);
        let result = await promise.json();
        cache[key] = { value: result };
        return result;
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("cached value");
      return cache[key].value;
    }
  };
};

// 3
const cachedApiCall = (time) => {
  const cache = {};
  return async (url, config = {}) => {
    const key = `${url}${JSON.stringify(config)}`;
    const entry = cache[key];
    if (entry === undefined || Date.now() > entry.expiry) {
      console.log("making api call");
      try {
        const resp = await fetch(url, config);
        const data = await resp.json();
        cache[key] = {
          result: data,
          expiry: Date.now() + time
        };
        return data;
      } catch (error) {
        console.error(error);
      }
    } else {
      return cache[key].result;
    }
  };
};

// const call = cachedApiCall(1000);
await call("https://jsonplaceholder.typicode.com/todos/1", {});
await call("https://jsonplaceholder.typicode.com/todos/1", {});
await call("https://jsonplaceholder.typicode.com/todos/1", {});
await call("https://jsonplaceholder.typicode.com/todos/1", {});
await call("https://jsonplaceholder.typicode.com/todos/2", {});

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/100", {});
}, 500);

// Why Store the Promise?
// When an API call is initiated, the response takes time to resolve (because the server needs time to respond).

// If you don’t store the promise, and another call with the same key is made while the first call is still in progress:

// It will trigger a new API call because the cache doesn't yet contain the resolved data.
// This leads to redundant API requests.
// If you store the promise, subsequent calls with the same key will:
// Reuse the in-progress promise instead of starting a new API request.
// Wait for the promise to resolve and then receive the same data as the first call.

// 4 please avoid async await while caching api calls
function cacheApiCall(delay) {
  const cache = {};
  return function (url, config = {}) {
    const key = `${url}${JSON.stringify(config)}`;
    //Check the cache
    const value = cache[key];
    if (!value || Date.now() > value.expiry) {
      try {
        console.log("Making New API call");
        let promise = fetch(url, config).then((data) => {
          return data.json();
        });
        cache[key] = {
          result: promise,
          expiry: Date.now() + delay
        };
        return promise;
      } catch (error) {
        console.error(error);
        delete cache[key];
      }
    } else {
      console.log("Cached response");
      return cache[key].result;
    }
  };
}

// const call = cacheApiCall(1500);
call("https://jsonplaceholder.typicode.com/todos/1").then((data) => {
  console.log(data);
});
call("https://jsonplaceholder.typicode.com/todos/1").then((data) => {
  console.log(data);
});
call("https://jsonplaceholder.typicode.com/todos/2").then((data) => {
  console.log(data);
});
