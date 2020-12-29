export interface ISignupResponseModel {
  resolve(token: string): void;
  invalidData(errors: any[]): void;
  userExists(): void;
}