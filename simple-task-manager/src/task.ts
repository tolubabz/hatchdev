export type TaskStatus = "Pending" | "Completed";

type TaskDetails = {
  id: number;
  description: string;
  status: TaskStatus;
};

export class Task {
  readonly id: number;
  description: string;
  status: TaskStatus;

  constructor(taskDetails: TaskDetails) {
    this.id = taskDetails.id;
    this.description = taskDetails.description;
    this.status = taskDetails.status;
  }
}
