import type { UserEmail } from "./value-objects/UserEmail.js";
import type { UserId } from "./value-objects/UserId.js";
import type { UserPassword } from "./value-objects/UserPassword.js";

export class User {
  constructor(
    private id: UserId,
    private email: UserEmail,
    private password: UserPassword,
    private createdAt: Date,
    private updatedAt: Date,
    public token?: string,
  ) {}

  setPassword() {
    this.password.value = '';
  }

  get getPassword() {
    return this.password.value;
  }

  get userId() {
    return this.id.value;
  }

  get primitives() {
    return {
      id: this.id.value,
      email: this.email.value,
      token: this.token,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}