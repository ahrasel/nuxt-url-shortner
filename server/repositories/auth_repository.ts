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

      // remove password from user
      newUser.password = "";

      // generate token
      const token = jwt.sign({ newUser }, process.env.JWT_SECRET_KEY!);

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

    // if user not found, throw error
    if (user === null || user === undefined) {
      throw new Error("Invalid username or password");
    }

    // if user found, compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid username or password");
    }

    // remove password from user
    user.password = "";

    // generate token
    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY!);

    // return token and user
    return { token: token, user: user };
  };

  public logout = (token: string) => {
    // validate token
    if (token === undefined) {
      throw new Error("Invalid token");
    }

    // split token to get the actual token
    const splitToken = token.split(" ");
    const actualToken = splitToken[1];

    // return success message
    return { message: "Logout successful" };
  };

  public forgotPassword = async (email: string): Promise<any> => {
    if (email === undefined) {
      throw new Error("Invalid email");
    }

    // find user by email
    const user = await User.findOne({ email: email }).exec();

    // if user not found, throw error
    if (user === null || user === undefined) {
      throw new Error("Invalid email");
    }

    // password reset link generation logic
    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1h",
    });

    const link = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    const template = `
      <div>
        <h1>Reset password</h1>
        <p>Click <a href="${link}">here</a> to reset your password</p>
      </div>`;

    this.sendMail(email, "Reset password", template);

    // return success message
    return { message: "Forgot password successful" };
  };

  public changePassword = async (
    oldPassword: string,
    newPassword: string,
    event: any
  ): Promise<any> => {
    await this.auth(event);

    // validate old password and new password
    if (oldPassword === undefined || newPassword === undefined) {
      throw new Error("Invalid old password or new password");
    }

    // find user by id
    const user = await User.findById(this.userId).exec();

    // if user not found, throw error
    if (user === null || user === undefined) {
      throw new Error("Invalid user");
    }

    // if user found, compare password
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid old password");
    }

    // bcrypt new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update user password
    User.findByIdAndUpdate(this.userId, { password: hashedPassword }, { new: true }).exec();

    // return success message
    return { message: "Change password successful" };
  };
}
