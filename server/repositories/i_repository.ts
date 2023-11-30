export interface IRepository {
  sendMail(to: string, subject: string, text: string): void;
  slug(value: string): string;
}
