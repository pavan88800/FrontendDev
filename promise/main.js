const STATE = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED"
};
class myPromise {
  constructor(callback) {
    this.state = STATE.PENDING;
    this.result = undefined; // resolve, reject
    this.handlersList = []; // then and reject finally
    // bind this why because resolve , reject context is point to window
    // Binding ensures `this` refers to the instance
    this._resolve = this._resolve.bind(this);
    this._reject = this._reject.bind(this);

    try {
      callback(this._resolve, this._reject);
    } catch (error) {
      this._reject(error);
    }
  }

  _resolve(result) {
    this.updateHandler(result, STATE.FULFILLED);
  }

  _reject(error) {
    this.updateHandler(error, STATE.REJECTED);
  }

  updateHandler = (result, state) => {
    queueMicrotask(() => {
      /* code to run in the microtask here */
      if (this.state !== STATE.PENDING) {
        return;
      }

      if (this.isThenable(result)) {
        return result.then(this._resolve, this._reject);
      }
      this.result = result;
      this.state = state;

      // execute handlers if already attached
      this.executeHandlers();
    });
  };

  isThenable(val) {
    return val instanceof myPromise;
  }

  then(onSuccess, onFail) {
    return new myPromise((resolve, reject) => {
      this.addHandlerList({
        onSuccess: (val) => {
          if (!onSuccess) {
            return resolve(val); // pass to  next then chain
          }
          try {
            return resolve(onSuccess(val));
          } catch (error) {
            return reject(error);
          }
        },
        onFail: (value) => {
          if (!onFail) {
            return reject(value);
          }
          try {
            return resolve(onFail(value)); // resolve to next then to handle then method...
          } catch (err) {
            return reject(err);
          }
        }
      });
    });
  }

  addHandlerList(handlers) {
    this.handlersList.push(handlers);
    this.executeHandlers();
  }

  executeHandlers() {
    if (this.state === STATE.PENDING) {
      return null; // If still pending, don't process handlers
    }

    this.handlersList.forEach((handler) => {
      if (this.state === STATE.FULFILLED) {
        // Call onSuccess if promise is fulfilled
        return handler.onSuccess(this.result);
      } else if (this.state === STATE.REJECTED) {
        // Call onFail if promise is rejected
        return handler.onFail(this.result);
      }
    });
    // Clear the handlers list after executing them
    this.handlersList = [];
  }

  catch(onFail) {
    return this.then(null, onFail);
  }
}
new myPromise((resolve, reject) => {
  resolve("12");
}).then((data) => {
  console.log(data);
  return "apav";
});
