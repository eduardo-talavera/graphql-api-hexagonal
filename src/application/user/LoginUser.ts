import type { Bcrypt } from "../../domain/services/Bcrypt.js";
import type { JwtAuth } from "../../domain/services/JwtAuth.js";
import type { UserRepository } from "../../domain/user/UserRepository.js";
import { User } from "../../domain/user/User.js";
import { 
  UserInvalidCredentialsError, 
  UserNotFoundError 
} from "../../domain/user/UserErrors.js";



export class LoginUser {

  constructor(
    private repository: UserRepository,
    private bcrypt: Bcrypt,
    private jwt: JwtAuth
  ) {}

  async execute(email: string, password: string): Promise<User | null> {
    const foundUser = await this.repository.findByEmail(email);
    if (!foundUser) throw new UserNotFoundError(email);
    
    const isValidPassword = await this.bcrypt.compare(password, foundUser.getPassword);
    if (!isValidPassword) throw new UserInvalidCredentialsError();

    const { token, ...user } = foundUser.primitives;
    const accessToken = this.jwt.generateToken({ ...user });
    foundUser.token = accessToken;

    return foundUser;
  }
}