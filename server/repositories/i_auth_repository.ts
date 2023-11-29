import { IUser } from "../models/user";

export interface IAuthRepository {
  register(user: IUser): any;
  login(username: String, password: String): any;
}
