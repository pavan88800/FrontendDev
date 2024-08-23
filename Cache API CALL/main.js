function cachedApiCall(time) {
  const cachedApi = {};
  return async function (url, config = {}) {
    const key = `${url}${JSON.stringify(config)}`;
    const entry = cachedApi[key];
    if (entry === undefined || Date.now() > entry.expiry) {
      console.log("Making Fresh API Call");
    }
    try {
      let resp = await fetch(url, config);
      resp = await resp.JSON();
      cachedApi[key] = {
        value: resp,
        expiry: Date.now() + time
      };
    } catch (error) {
      console.log(error);
    }
    return cachedApi[key].value;
  };
}

let call = cachedApiCall(1000);

call("https://jsonplaceholder.typicode.com/todos/1").then((data) => {
  console.log(data);
});
