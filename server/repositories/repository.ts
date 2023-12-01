import { IUser } from "../models/user";
import { IRepository } from "./i_repository";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export class Repository implements IRepository {
  public user: IUser | null = null;
  public token: string | null = null;
  public userId: string | null = null;

  public sendMail = (to: string, subject: string, template: string) => {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_SERVER,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    } as any);

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: to,
      subject: subject,
      text: template,
      html: template,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error("Error sending email");
      }
    });
  };

  public auth = async (event: any): Promise<boolean> => {
    try {
      const body = await getHeaders(event);

      const token = body.authorization;

      if (token === undefined) {
        throw new Error("Unauthorized");
      }

      const splitToken = token.split(" ");

      const decoded: any = jwt.verify(splitToken[1], process.env.JWT_SECRET_KEY!);

      const user = decoded.user;

      this.user = user;
      this.token = splitToken[1];
      this.userId = user._id;

      return true;
    } catch (error: any) {
      throw error;
    }
  };

  public slug = (value: string): string => {
    return value
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };

  public generateUniqueCode = (): string => {
    return Math.random().toString(36).substr(2, 6);
  };
}
