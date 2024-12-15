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

export class OrderAreTheDifferentUserError extends Error {
  constructor(message: string = "Order are the different user") {
    super(message);
    this.name = "OrderAreTheDifferentUserError";
  }
}
