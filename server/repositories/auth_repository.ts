import { Repository } from "./repository";
import { IAuthRepository } from "./i_auth_repository";
import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

    // send email
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_SERVER,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    } as any);

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

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Reset password",
      text: "Reset password",
      html: template,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error("Error sending email");
      }
    });

    // return success message
    return { message: "Forgot password successful" };
  };

  public changePassword = (oldPassword: string, newPassword: string): any => {
    throw new Error("Method not implemented.");
  };
}
