export class BaseController {
  public successResponse = (data: any, message: String, status: Number) => {
    return {
      status: 200,
      data: data,
      message: message,
    };
  };

  public errorResponse = (message: String, status: Number) => {
    return {
      status: status,
      message: message,
    };
  };
}
