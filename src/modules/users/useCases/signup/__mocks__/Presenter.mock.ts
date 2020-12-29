import { ISignupResponseModel  } from "../secondaryPorts/ISignupResponseModel";

export class PresenterMock implements ISignupResponseModel {
  result: string;

  constructor() {}

  resolve(token: string): void {
    this.result = token;
  }

  invalidData(errors: any[]): void {
    this.result = "invalid data";
  }
  userExists(): void {
    this.result = "the user exists";
  }
}