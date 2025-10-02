import { CreateUser } from '../../../application/user/CreateUser.js';
import { UserErrorMapper } from '../UserErrorMapper.js';

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUser) {}

  async run(_: any, args: { email: string; password: string }) {
    const { email, password } = args;
   
    try {
      const user = await this.createUserUseCase.execute(email, password);
    
      return {
        code: 201,
        success: true,
        message: 'User created successfully',
        user: user.primitives
      };
    } catch (error) {
      const err = error as Error;
      const httpError = UserErrorMapper.toHttp(err);
      return httpError
    }
  }
}