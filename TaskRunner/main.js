class TaskRunner {
  constructor(limit) {
    this.limit = limit || 3;
    this.queue = [];
    this.activePromise = 0;
  }

  async execute(promise) {
    this.activePromise++;
    try {
      await promise();
    } catch (error) {
      console.log(error);
    } finally {
      this.activePromise--;
      if (this.queue.length) {
        const nextTask = this.queue.shift();
        await this.execute(nextTask);
      }
    }
  }

  async push(promise) {
    if (this.activePromise < this.limit) {
      this.execute(promise);
    } else {
      this.queue.push(promise);
    }
  }
}
const promises = [
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log("Promise 1 resolved");
        resolve();
      }, 1000)
    ),
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log("Promise 2 resolved");
        resolve();
      }, 2000)
    ),
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log("Promise 3 resolved");
        resolve();
      }, 3000)
    ),
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log("Promise 4 resolved");
        resolve();
      }, 4000)
    ),
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log("Promise 5 resolved");
        resolve();
      }, 5000)
    ),
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log("Promise 6 resolved");
        resolve();
      }, 6000)
    )
];

const runner = new TaskRunner(3);
promises.forEach((promise) => runner.push(promise));
