import { UserPrismaRepository } from "../user/repositories/UserPrismaRepository.js";
import { TaskPrismaRepository } from "./repositories/TaskPrismaRepository.js";
import { CreateTask } from "../../application/task/CreateTask.js";
import { CreateTaskController } from "./controllers/CreateTaskController.js";


const userRepository = new UserPrismaRepository();
const taskRepository = new TaskPrismaRepository();


// Create Task
const createTaskUseCase = new CreateTask(taskRepository, userRepository);
export const createTaskController = new CreateTaskController(createTaskUseCase);