import { UserValidationError } from "../UserErrors";

export class UserPassword {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid;
  }

  ensureIsValid() {
    if (!!this.value) {
      if (this.value.length < 8) 
        throw new UserValidationError('Lenght value should be 8 or more')
    }
  }
}