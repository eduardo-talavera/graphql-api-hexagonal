import type { Task } from "../../domain/task/Task";
import type { TaskRepository } from "../../domain/task/TaskRepository";
import { UserByIdNotFoundError } from "../../domain/user/UserErrors";
import type { UserRepository } from "../../domain/user/UserRepository";
import type { CreateTaskDto } from "./dto";

export class CreateTask {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(payload: CreateTaskDto): Promise<Task> {
    const { userId } = payload;
    const user = await this.userRepository.findById(userId);

    if (!user) throw new UserByIdNotFoundError(userId);
    
    const newTask = await this.taskRepository.create(payload);
    return newTask;
  }
  
}