import { ISignupRequestModel  } from "../secondaryPorts/ISignupRequestModel";

export class RequestModelMock implements ISignupRequestModel {
  data: any;

  constructor(data: any) {
    this.data = data;
  }

  getData(): { name: string; email: string; password: string; } {
    return {
      name: this.data.name,
      email: this.data.email,
      password: this.data.password,
    };
  }
}