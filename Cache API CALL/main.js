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
