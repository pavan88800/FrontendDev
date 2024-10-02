// You have five asynchronous tasks: A, B, C, D, and E. The relationships between the tasks are as follows:
// Tasks A, B, and C are independent; they can run in any order or simultaneously.
// Task D depends on the completion of both A and B.
// Task E depends on the completion of both C and D.
// The goal is to create a system that runs these tasks in the correct order based on their dependencies.

class TaskDependentRunner {
  constructor() {
    this.tasks = {};
  }

  // registerTask name
  registerTask(taskName, task, dependencies = []) {
    this.tasks[taskName] = {
      task,
      dependencies
    };
  }

  async TaskRunner(name) {
    if (!this.tasks[name]) return;
    const { dependencies, task } = this.tasks[name];

    for (let dependency of dependencies) {
      await this.TaskRunner(dependency);
    }
    await task();

    delete this.tasks[name];
  }

  async executeTask() {
    for (let key in this.tasks) {
      await this.TaskRunner(key);
    }
  }
}

const taskRunner = new TaskDependentRunner();
taskRunner.registerTask("A", taskA, []);
taskRunner.registerTask("B", taskB, []);
taskRunner.registerTask("C", taskC, []);
taskRunner.registerTask("D", taskD, ["A", "B"]);
taskRunner.registerTask("E", taskE, ["C", "D"]);

taskRunner.executeTask();
