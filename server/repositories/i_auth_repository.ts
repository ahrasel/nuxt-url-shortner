import { IUser } from "../models/user";

export interface IAuthRepository {
  forgotPassword(email: string): any;
  changePassword(oldPassword: string, newPassword: string, event: any): any;
  logout(token: string): any;
  register(user: IUser): any;
  login(username: String, password: String): any;
}
