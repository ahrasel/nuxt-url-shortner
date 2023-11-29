import { Repository } from "./repository";
import { IAuthRepository } from "./i_auth_repository";
import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthRepository extends Repository implements IAuthRepository {
  public register = async (user: IUser) => {
    try {
      // validate user
      if (user === undefined) {
        throw new Error("Invalid user");
      }

      // bcrypt password
      user.password = await bcrypt.hash(user.password, 10);

      // create user
      const newUser = new User(user);

      // save user
      await newUser.save();

      // generate token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY!);

      // return token and user
      return { token: token, user: newUser };
    } catch (error: any) {
      if (error.keyPattern?.username === 1) {
        throw new Error("Username already exists");
      }
      if (error.keyPattern?.email === 1) {
        throw new Error("Email already exists");
      }

      throw error;
    }
  };

  public login = async (username: string, password: string): Promise<any> => {
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
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid username or password");
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY!);

    // return token and user
    return { token: token, user: user };
  };
}
