// please complete the implementation
class EventEmitter {
  constructor() {
    this.store = {};
  }
  subscribe(eventName, callback) {
    if (this.store[eventName] == undefined) {
      this.store[eventName] = [];
    }
    this.store[eventName].push(callback);

    return {
      release: () => {
        let index = this.store[eventName].findIndex((el) => el === callback);
        if (index !== -1) {
          this.store[eventName].splice(index, 1);
        }
      }
    };
  }

  emit(eventName, ...args) {
    if (this.store[eventName] !== undefined) {
      this.store[eventName].forEach((el) => {
        el(...args);
      });
    }
  }
}
