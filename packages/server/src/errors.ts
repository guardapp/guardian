export class ServerError extends Error {
    code = 500;

    constructor(message = 'Internal Server Error') {
      super(message);
    }

    static fromError(error: Error) {
      const e = new this(error.message);
      e.stack = error.stack;
      return e;
    }
}

export class BadRequest extends ServerError {
    code = 400;

    constructor(message = 'Bad request') {
      super(message);
    }
}

export class NotFound extends ServerError {
  code = 404;

  constructor(message = 'Not Found') {
    super(message);
  }
}
