import type { CreateTaskDto } from "../../application/task/dto/CreateTaskDto.js";
import type { UpdateTaskDto } from "../../application/task/dto/UpdateTaskDto.js";
import type { Task } from "./Task.js";

export interface TaskRepository {
  create(task: CreateTaskDto): Promise<Task>;
  getById(id: string): Promise<Task | null>;
  update(id: string, task: UpdateTaskDto): Promise<Task>;
  delete(id: string): Promise<void>;
  listByUserId(userId: string): Promise<Task[]>;
}
