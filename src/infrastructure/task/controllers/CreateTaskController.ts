import { CreateTask } from "../../../application/task/CreateTask.js";
import type { User } from "../../../domain/user/User.js";
import { TaskErrorMapper } from "../TaskErrorMapper.js";

export class CreateTaskController {
  constructor(private readonly createTaskUseCase: CreateTask) {}

  async run(_: any, args: { title: string; description: string; }, context: { currentUser: User } ) {

    if (!context.currentUser) {
      return {
        code: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    const { title, description } = args;
    const { currentUser: { userId } } = context;

    try {
      const task = await this.createTaskUseCase.execute({ title, description, userId });

      return {
        code: 201,
        success: true,
        message: "Task created successfully",
        task: {
          id: task.getId,
          title: task.getTitle,
          description: task.getDescription,
          completed: task.isCompleted,
          userId: task.getUserId,
          createdAt: task.getCreatedAt,
          updatedAt: task.getCreatedAt,
        },
      };
    } catch (error) {
      const err = error as Error;
     
      const httpError = TaskErrorMapper.toHttp(err);
      return httpError
    }
  }
}