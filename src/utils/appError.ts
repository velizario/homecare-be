class AppError extends Error {
  status: string;
  data?: {};
  // isOperational: boolean;
  constructor(message: string, public statusCode: number, data: {} = {}) {
    super(message);
    this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
    this.data = data;
    // this.isOperational = true;
    console.log(this)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
