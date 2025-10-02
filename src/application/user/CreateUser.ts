import type { UserRepository } from '../../domain/user/UserRepository.js';
import type { Bcrypt } from '../../domain/services/Bcrypt.js';
import { User } from '../../domain/user/User.js';
import { UserAlreadyExistsError } from '../../domain/user/UserErrors.js';

export class CreateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: Bcrypt
  ) {}

  async execute(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new UserAlreadyExistsError(email);
    }
    // hash pasword before saving to database
    const hashedPassword = await this.bcryptService.hash(password);
    const newUser = await this.userRepository.create(email, hashedPassword);
    newUser.setPassword(); // Ensure password is not exposed

    return newUser;
  }
}