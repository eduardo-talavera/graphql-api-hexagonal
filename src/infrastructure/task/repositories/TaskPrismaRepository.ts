import type { CreateTaskDto, UpdateTaskDto } from "../../../application/task/dto";
import { Task } from "../../../domain/task/Task.js";
import type { TaskRepository } from "../../../domain/task/TaskRepository.js";
import { UserId } from "../../../domain/user/value-objects/UserId.js";
import { PrismaSingleton } from '../../db/PrismaClient.js';
import { PrismaClient } from '@prisma/client';


type PrismaTask = {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class TaskPrismaRepository implements TaskRepository {
  private db: InstanceType<typeof PrismaClient>;

  constructor() {
    this.db = PrismaSingleton.getInstance().prisma;
  }

  async create(task: CreateTaskDto): Promise<Task> {
    const newTask = await this.db.task.create({
      data: {
        ...task
      },
    });

    return this.mapToDomain(newTask);
  }

  async getById(id: string): Promise<Task | null> {
    const task = await this.db.task.findUnique({
      where: { id },
    });

    if (!task) {
      return null;
    }

    return this.mapToDomain(task);
  }

  async update(id: string, task: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.db.task.update({
      where: { id },
      data: {
        ...task
      },
    });

    return this.mapToDomain(updatedTask);
  }

  async delete(id: string): Promise<void> {
    await this.db.task.delete({
      where: { id },
    });
  }

  async listByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.db.task.findMany({
      where: { userId },
    });

    return tasks.map(this.mapToDomain);
  }

  private mapToDomain(task: PrismaTask): Task {
    return new Task(
      task.id,
      new UserId(task.userId),
      task.title,
      task.description,
      task.completed,
      new Date(task.createdAt),
      new Date(task.updatedAt)
    );
  }
}