import { BaseController } from "./controller";
import { IAuthRepository } from "../repositories/i_auth_repository";
import { AuthRepository } from "../repositories/auth_repository";
import { IUser } from "../models/user";

class AuthController extends BaseController {
  private authRepository: IAuthRepository;

  constructor() {
    super();
    this.authRepository = new AuthRepository();
  }

  public login = async (event: any) => {
    try {
      const body = await readBody(event);

      const username = body.username;
      const password = body.password;

      const loginResponse = await this.authRepository.login(username, password);

      return this.successResponse(loginResponse, "Login successful", 200);
    } catch (error: any) {
      return this.errorResponse(error.message, 500);
    }
  };

  public register = async (event: any) => {
    try {
      const body = await readBody(event);

      const user: IUser = {
        name: body.name,
        email: body.email,
        password: body.password,
        username: body.username,
      };

      const registerResponse = await this.authRepository.register(user);

      return this.successResponse(registerResponse, "Register successful", 200);
    } catch (error: any) {
      // console.log(error);
      return this.errorResponse(error.message, 500);
    }
  };

  public logout = async (event: any) => {
    try {
      const body = await getHeaders(event);

      const token = body.authorization;

      if (token === undefined) {
        throw new Error("Invalid token");
      }

      const logoutResponse = await this.authRepository.logout(token);

      return this.successResponse(logoutResponse, "Logout successful", 200);
    } catch (error: any) {
      return this.errorResponse(error.message, 500);
    }
  };

  public changePassword = async (event: any) => {
    try {
      const body = await readBody(event);

      const oldPassword = body.oldPassword;
      const newPassword = body.newPassword;

      const changePasswordResponse = await this.authRepository.changePassword(
        oldPassword,
        newPassword
      );

      return this.successResponse(changePasswordResponse, "Change password successful", 200);
    } catch (error: any) {
      return this.errorResponse(error.message, 500);
    }
  };

  public forgotPassword = async (event: any) => {
    try {
      const body = await readBody(event);

      const email = body.email;

      const forgotPasswordResponse = await this.authRepository.forgotPassword(email);

      return this.successResponse(forgotPasswordResponse, "Forgot password successful", 200);
    } catch (error: any) {
      return this.errorResponse(error.message, 500);
    }
  };
}

export default new AuthController();
