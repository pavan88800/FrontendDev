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

//Q2 modification

function taskQueue(limit, timeout = 3000, retry = 2) {
  let concurrencyLimit = limit;
  let activePromise = 0;
  let queue = [];
  let isRejected = false;
  let retryMap = new Map();
  async function execute(task) {
    if (isRejected) return;
    activePromise++;
    if (!retryMap.has(task)) {
      retryMap.set(task, 0);
    }
    try {
      // promise timeOut
      const promiseTimeOut = new Promise((_, reject) => {
        setTimeout(() => {
          reject("Task took longer time to complete");
        }, 1000);
      });
      const result = await Promise.race([task(), promiseTimeOut]);
      console.log(result);
    } catch (error) {
      //promise will retry on the retry count...
      const retryCount = retryMap.get(task);
      if (retryCount < retry) {
        retryMap.set(task, retryCount + 1);
        console.log(`Retrying task... Attempt ${retryCount + 1}`);
        execute(task);
      } else {
        isRejected = true;
      }
    } finally {
      activePromise--;
      if (!isRejected && queue.length > 0) {
        const nextTask = queue.shift();
        execute(nextTask);
      }
    }
  }

  function push(task) {
    if (activePromise < concurrencyLimit) {
      execute(task);
    } else {
      queue.push(task);
    }
  }

  return { push };
}

const { push } = taskQueue(2);

promiseList.forEach((item) => {
  push(item);
});
