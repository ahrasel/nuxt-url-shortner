export interface IRepository {
  sendMail(to: string, subject: string, text: string): void;
}
