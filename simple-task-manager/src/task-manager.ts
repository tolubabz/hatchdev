import { Task, TaskStatus } from "./task";

export class TaskManager {
  private tasks: Task[] = [];
  private nextId: number = 0;

  createTask(description: string): string {
    const task = new Task({
      id: ++this.nextId,
      description,
      status: "Pending",
    });
    this.tasks.push(task);
    return `Task '${description}' created.`;
  }

  listTasks(filter: TaskStatus | "All"): Task[] {
    if (filter === "All") return this.tasks;

    return this.tasks.filter((t) => t.status === filter);
  }

  completeTask(id: number): string {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return "Task not found.";
    task.status = "Completed";
    return `Task ${id} marked as completed.`;
  }

  updateTask(id: number, newDescription: string): string {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return "Task not found.";
    task.description = newDescription;
    return `Task ${id} updated.`;
  }
}
