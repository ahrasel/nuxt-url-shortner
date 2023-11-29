import { IUser } from "../models/user";

export interface IAuthRepository {
  logout(token: string): any;
  register(user: IUser): any;
  login(username: String, password: String): any;
}
