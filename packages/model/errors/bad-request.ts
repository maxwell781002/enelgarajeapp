export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class UserIsNotCollaboratorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserIsNotCollaboratorError";
  }
}
