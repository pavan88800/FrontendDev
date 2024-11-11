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

const taskQueue = new TaskRunner(2, 3);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
taskQueue.addTask(() => delay(2000).then(() => console.log("Task 1 done"))); //
taskQueue.addTask(() => delay(1300).then(() => console.log("Task 3 done")));
taskQueue.addTask(() => delay(1000).then(() => console.log("Task 4 done")));
// taskQueue.addTask(() => Promise.reject("Rejected"));

taskQueue.addTask(() => delay(100).then(() => console.log("Task 5 done")));
taskQueue.addTask(() => delay(1600).then(() => console.log("Task 6 done")));
// taskQueue.run().then(() => console.log("New All tasks completed."));

// 0 sec 2 task are pushed to  the run task1 and task3
// 1.3  task 3 completes, task4  pushed queue and starts run
// at 2sec  task1 completes and task 5 starts run task4 and task5 are in the queue
// 2.1 sec  = when task started(2) + who long the task took 100sec
// 2.1 sec task 5 completes  and task 6 start run
// 3 sec task 4 completes
// 3.7sec task 6 completes

class TaskRunner {
  constructor() {
    this.currentTask = 0;
    this.queue = [];
  }
  addTask(callback) {
    this.queue.push(callback);
  }

  run() {
    return new Promise((resolve, reject) => {
      const helper = () => {
        if (this.currentTask === this.queue.length) {
          resolve();
          return;
        }
        const task = this.queue[this.currentTask++];
        task()
          .then((data) => {
            helper();
          })
          .catch((err) => {
            console.error(err);
            helper();
          });
      };
      helper();
    });
  }
}
