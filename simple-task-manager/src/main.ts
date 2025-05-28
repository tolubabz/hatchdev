import inquirer from "inquirer";
import { TaskManager } from "./task-manager";

class Main {
  private readonly taskManager: TaskManager;

  constructor() {
    this.taskManager = new TaskManager();
  }

  async start() {
    while (true) {
      const { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Create Task",
          "Update Task",
          "Complete Task",
          "List Tasks",
          "Exit",
        ],
      });

      switch (action) {
        case "Create Task":
          await this.createTask();
          break;
        case "Update Task":
          await this.updateTask();
          break;
        case "Complete Task":
          await this.completeTask();
          break;
        case "List Tasks":
          await this.listTasks();
          break;
        case "Exit":
          console.log("Goodbye!");
          return;
      }
    }
  }

  async createTask() {
    const { description } = await inquirer.prompt({
      type: "input",
      name: "description",
      message: "Task description:",
    });
    console.log(this.taskManager.createTask(description));
  }

  async updateTask() {
    const { taskId, newDescription } = await inquirer.prompt([
      { type: "number", name: "taskId", message: "Task ID to update:" },
      {
        type: "input",
        name: "newDescription",
        message: "New description:",
      },
    ]);
    console.log(this.taskManager.updateTask(taskId, newDescription));
  }

  async completeTask() {
    const { taskId } = await inquirer.prompt({
      type: "number",
      name: "taskId",
      message: "Task ID to complete:",
    });
    console.log(this.taskManager.completeTask(taskId));
  }

  async listTasks() {
    const { filter } = await inquirer.prompt({
      type: "list",
      name: "filter",
      message: "Filter by:",
      choices: ["All", "Pending", "Completed"],
    });

    const tasks = this.taskManager.listTasks(filter);
    if (tasks.length === 0) {
      console.log("No tasks to show.");
    } else {
      tasks.forEach((task) =>
        console.log(`#${task.id}: ${task.description} [${task.status}]`)
      );
    }
  }
}

new Main().start();
