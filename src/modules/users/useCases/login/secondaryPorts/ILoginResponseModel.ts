export interface ILoginResponseModel {
  resolve(token: string): void;
  invalidData(errors: any[]): void;
  userDoesntExist(): void;
  passwordInvalid(): void;
}