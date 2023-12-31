const ERROR_BY_CODE = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Internal Server Error'
}

type ErrorCode = keyof typeof ERROR_BY_CODE

export class ControllerError extends Error {
  public code

  constructor(code: ErrorCode, message?: string) {
    super(message || ERROR_BY_CODE[code]);
    this.code = code
  }
}