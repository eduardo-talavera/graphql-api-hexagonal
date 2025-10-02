import { UserValidationError } from "../UserErrors.js";

export class UserId {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (this.value.length < 5)
        throw new UserValidationError('Lenght value should be 5 or more')    
  }
}