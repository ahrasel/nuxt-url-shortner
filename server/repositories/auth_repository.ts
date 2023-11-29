import { Repository } from "./repository";
import { IAuthRepository } from "./i_auth_repository";
import User from "../models/user";

export class AuthRepository extends Repository implements IAuthRepository {
  public login = async (username: String, password: String): Promise<any> => {
    // validate username and password
    if (username === undefined || password === undefined) {
      throw new Error("Invalid username or password");
    }

    // find user by username
    const user = await User.findOne({ username: username }).exec();

    console.log(user);

    // if user not found, throw error
    if (user === null || user === undefined) {
      throw new Error("Invalid username or password");
    }

    // if user found, compare password
    if (user?.password !== password) {
      throw new Error("Invalid username or password");
    }

    // if password is correct, return user
    return user;
  };
}
