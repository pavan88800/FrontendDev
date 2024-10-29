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

const schedules = [
  {
    id: "a",
    dependencies: ["b", "c"]
  },

  {
    id: "b",
    dependencies: []
  },

  {
    id: "c",
    dependencies: []
  },
  {
    id: "d",
    dependencies: []
  },
  {
    id: "e",
    dependencies: []
  },
  {
    id: "f",
    dependencies: []
  }
];

function removeTask(id) {
  schedules.forEach((el) => {
    const index = el.dependencies.indexOf(id);
    if (index !== -1) {
      el.dependencies.splice(index, 1);
    }
  });
}

let totalTaskCompleted = 0;
let processed = {}; // Track completed tasks

function solution(taskArr) {
  while (totalTaskCompleted < taskArr.length) {
    let taskFound = false;

    for (let i = 0; i < taskArr.length; i++) {
      const task = taskArr[i];
      //it runs none dependencies code  here
      if (!task.dependencies.length && !processed[task.id]) {
        console.log(task.id);
        processed[task.id] = true; // Mark as processed
        removeTask(task.id); // remove dependencies
        taskFound = true;
        totalTaskCompleted++;
      }
    }

    if (!taskFound) {
      console.log("Task not found");
      return; // Exit loop if no tasks were processed in this round
    }
  }
}

solution(schedules);
