import { UserPrismaRepository } from "../user/repositories/UserPrismaRepository";
import { TaskPrismaRepository } from "./repositories/TaskPrismaRepository";
import { CreateTask } from "../../application/task/CreateTask";
import { CreateTaskController } from "./controllers/CreateTaskController";


const userRepository = new UserPrismaRepository();
const taskRepository = new TaskPrismaRepository();


// Create Task
const createTaskUseCase = new CreateTask(taskRepository, userRepository);
export const createTaskController = new CreateTaskController(createTaskUseCase);