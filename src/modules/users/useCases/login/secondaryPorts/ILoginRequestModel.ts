export interface ILoginRequestModel {
  getData(): {
    email: string;
    password: string;
  }
}