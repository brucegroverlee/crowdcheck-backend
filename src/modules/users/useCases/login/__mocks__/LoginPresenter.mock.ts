import { ILoginResponseModel  } from "../secondaryPorts/ILoginResponseModel";

export class PresenterMock implements ILoginResponseModel {
  result: string;

  resolve(token: string): void {
    this.result = token;
  }

  invalidData(errors: any[]): void {
    this.result = "invalid data";
  }

  userDoesntExist(): void {
    this.result = "the user doesn\'t exist";
  }

  passwordInvalid(): void {
    this.result = "the password is not correct";
  }
}