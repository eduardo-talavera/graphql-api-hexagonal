
import { 
  UserNotFoundError,
  UserUnAuthenticatedError,
} from "../../domain/user/UserErrors.js";

export interface HttpErrorResponse {
  code: number;
  success: boolean;
  message: string;
}

export class TaskErrorMapper {
  static toHttp(error: Error): HttpErrorResponse {
    const common = { success: false, message: error.message};

    const errorHttpMap = new Map<Function, number>([
      [UserNotFoundError, 404],
      [UserUnAuthenticatedError, 401],
    ]);

    const statusCode = errorHttpMap.get(error.constructor as Function);

    return statusCode
      ? { code: statusCode, ...common }
      : { 
        code: 500, 
        success: false, 
        message: `Internal Server Error: ${error.message}`
      };
  }
}
