class pubsub {
  constructor() {
    this.subscribeEvent = {};
    this.subscribeEventOnces = {};
    this.subscribeEventAsync = {};
  }

  subscribe(eventName, callback) {
    if (!this.subscribeEvent.hasOwnProperty(eventName)) {
      this.subscribeEvent[eventName] = [];
    }
    this.subscribeEvent[eventName].push(callback);
  }

  publish(eventName, ...args) {
    if (this.subscribeEvent.hasOwnProperty(eventName)) {
      this.subscribeEvent[eventName].forEach((callback) => {
        callback(...args);
      });
    }

    if (this.subscribeEventOnces.hasOwnProperty(eventName)) {
      this.subscribeEventOnces[eventName].forEach((callback) => {
        callback(...args);
      });
      this.subscribeEventOnces[eventName] = [];
    }

    if (this.subscribeEventAsync.hasOwnProperty(eventName)) {
      this.subscribeEventAsync[eventName].forEach((resolve) => {
        resolve(...args);
      });
    }
  }

  subscribeAsync(eventName) {
    return new Promise((resolve, reject) => {
      if (!this.subscribeEventAsync.hasOwnProperty(eventName)) {
        this.subscribeEventAsync[eventName] = [];
      }
      this.subscribeEventAsync[eventName].push(resolve);
    });
  }

  subscribeOnces(eventName, callback) {
    if (!this.subscribeEventOnces.hasOwnProperty(eventName)) {
      this.subscribeEventOnces[eventName] = [];
    }
    this.subscribeEventOnces[eventName].push(callback);
  }

  publishAll(...args) {
    for (let [key, values] of Object.entries(this.subscribeEvent)) {
      values.forEach((callback) => {
        callback(...args);
      });
    }
  }
}

const sub = new pubsub();
sub.subscribeAsync("event1").then((data) => {
  console.log("Async subscription resolved with data:", data);
});

sub.publish("event1", "pavan pavu");
