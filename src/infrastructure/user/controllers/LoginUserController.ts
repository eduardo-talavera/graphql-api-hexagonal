import type { LoginUser } from "../../../application/user/LoginUser.js";
import { UserErrorMapper } from "../UserErrorMapper.js";


export class LoginUserController {
  constructor(private readonly loginUserUseCase: LoginUser) {}

  async run(_: any, args: { email: string; password: string }) {
    const { email, password } = args;
   
    try {
      const user = await this.loginUserUseCase.execute(email, password);

      return {
        code: 200,
        success: true,
        message: 'Success login',
        user: user!.primitives  
      };
    } catch (error) {
      const err = error as Error;
      const httpError = UserErrorMapper.toHttp(err);
      return httpError
    }
  }
}