import { UserPrismaRepository } from "./repositories/UserPrismaRepository.js";
import { CreateUserController } from "./controllers/CreateUserController.js";
import { CreateUser } from "../../application/user/CreateUser.js";
import { BcryptService } from "../services/BcryptService.js";
import { LoginUser } from "../../application/user/LoginUser.js";
import { AuthService } from '../services/AuthService.js';
import { LoginUserController } from "./controllers/LoginUserController.js";

const userRepository = new UserPrismaRepository();
const bcryptService = new BcryptService();
const authService = new AuthService(process.env.JWT_SECRET!);

// create user
const createUserUseCase = new CreateUser(userRepository, bcryptService);
export const createUserController = new CreateUserController(createUserUseCase);

// Login User
const loginUserUseCase = new LoginUser(userRepository, bcryptService, authService);
export const loginUserController = new LoginUserController(loginUserUseCase);