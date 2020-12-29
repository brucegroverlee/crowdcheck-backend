export interface ISignupRequestModel {
  getData(): {
    name: string;
    email: string;
    password: string;
  }
}