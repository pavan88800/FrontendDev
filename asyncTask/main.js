class TaskRunner {
  constructor(limit, retry) {
    this.queue = [];
    this.seen = new Map();
    this.limit = limit;
    this.activePromise = 0;
    this.retry = retry;
  }

  async addTask(callback) {
    if (this.activePromise < this.limit) {
      await this.execute(callback);
    } else {
      this.queue.push(callback);
    }
  }

  async execute(callback) {
    if (!this.seen.has(callback)) {
      this.seen.set(callback, 0);
    }
    this.activePromise++;
    try {
      await callback();
    } catch (error) {
      let retryCount = this.seen.get(callback);
      if (retryCount < this.retry) {
        this.seen.set(callback, retryCount + 1);
        console.log(`Retrying task, attempt ${retryCount}`);
        await this.execute(callback);
      } else {
        console.error(error, "error");
      }
    } finally {
      this.activePromise--;
      if (this.queue.length > 0) {
        const nextTask = this.queue.shift();
        await this.execute(nextTask);
      }
    }
  }
}

const taskQueue = new TaskRunner(3, 3);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
taskQueue.addTask(() => delay(1000).then(() => console.log("Task 1 done")));
taskQueue.addTask(() => delay(1300).then(() => console.log("Task 3 done")));
taskQueue.addTask(() => delay(1400).then(() => console.log("Task 4 done")));
taskQueue.addTask(
  () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Promise 1 is Rejected");
      }, 0);
    })
);
taskQueue.addTask(
  () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Promise 2 is Rejected");
      }, 2000);
    })
);

// taskQueue.run().then(() => console.log("All tasks completed."));
taskQueue.addTask(() => delay(1500).then(() => console.log("Task 5 done")));
taskQueue.addTask(() => delay(1600).then(() => console.log("Task 6 done")));
// taskQueue.run().then(() => console.log("New All tasks completed."));
