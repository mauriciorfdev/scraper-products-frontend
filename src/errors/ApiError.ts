export class ApiError extends Error {
  status: number;
  errors?: {
    path: string;
    message: string;
  }[];
  constructor(
    message: string,
    status: number,
    errors?: {
      path: string;
      message: string;
    }[],
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}
