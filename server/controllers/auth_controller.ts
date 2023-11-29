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
}

export default new AuthController();
