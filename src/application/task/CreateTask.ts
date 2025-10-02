import type { Task } from "../../domain/task/Task.js";
import type { TaskRepository } from "../../domain/task/TaskRepository.js";
import { UserByIdNotFoundError } from "../../domain/user/UserErrors.js";
import type { UserRepository } from "../../domain/user/UserRepository.js";
import type { CreateTaskDto } from "./dto/CreateTaskDto.js";

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