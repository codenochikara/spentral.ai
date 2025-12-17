export class ConflictError extends Error {
  constructor(error, message = 'Conflict') {
    super(error ? `${message}: ${error.message}` : message);
    this.name = 'ConflictError';
    this.statusCode = 409;
    this.error = error;
  }
}

export class NotFoundError extends Error {
  constructor(error, message = 'Not Found') {
    super(error ? `${message}: ${error.message}` : message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
    this.error = error;
  }
}

export class ValidationError extends Error {
  constructor(error, message = 'Bad Request') {
    super(error ? `${message}: ${error.message}` : message);
    this.name = 'ValidationError';
    this.statusCode = 400;
    this.error = error;
  }
}

export class UnauthorizedError extends Error {
  constructor(error, message = 'Unauthorized') {
    super(error ? `${message}: ${error.message}` : message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

export class ForbiddenError extends Error {
  constructor(error, message = 'Forbidden') {
    super(error ? `${message}: ${error.message}` : message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
    this.error = error;
  }
}

export class InternalServerError extends Error {
  constructor(error, message = 'Internal Server Error') {
    super(error ? `${message}: ${error.message}` : message);
    this.name = 'InternalServerError';
    this.statusCode = 500;
    this.error = error;
  }
}

export class BadGatewayError extends Error {
  constructor(error, message = 'Bad Gateway') {
    super(error ? `${message}: ${error.message}` : message);
    this.name = 'BadGatewayError';
    this.statusCode = 502;
    this.error = error;
  }
}

export class ServiceUnavailableError extends Error {
  constructor(error, message = 'Service Unavailable') {
    super(error ? `${message}: ${error.message}` : message);
    this.name = 'ServiceUnavailableError';
    this.statusCode = 503;
    this.error = error;
  }
}

export class GatewayTimeoutError extends Error {
  constructor(error, message = 'Gateway Timeout') {
    super(error ? `${message}: ${error.message}` : message);
    this.name = 'GatewayTimeoutError';
    this.statusCode = 504;
    this.error = error;
  }
}

export class DatabaseError extends Error {
  constructor(error = null, message = 'Database Error') {
    super(error ? `${message}: ${error.message}` : message);
    this.name = 'DatabaseError';
    this.statusCode = 500;
    this.error = error;
  }
}
