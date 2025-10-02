
export class UserAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.name = 'UserAlreadyExistsError';
  }
}

export class UserNotFoundError extends Error {
  constructor(email: string) {
    super(`User with email: ${email} not found`);
    this.name = 'UserNotFoundError';
  }
}

export class UserByIdNotFoundError extends Error {
  constructor(id: string) {
    super(`User with id: ${id} not found`);
    this.name = 'UserNotFoundError';
  }
}

export class UserInvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
    this.name = 'UserInvalidCredentialsError';
  }
}

export class UserUnAuthenticatedError extends Error {
  constructor() {
    super('User is not authenticated');
    this.name = 'UserUnAuthenticatedError';
  }
}

export class UserValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserValidationError';
  }
}
