import { IRepository } from "./i_repository";
import nodemailer from "nodemailer";

export class Repository implements IRepository {
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
}
