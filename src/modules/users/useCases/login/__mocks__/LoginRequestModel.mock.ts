import { ILoginRequestModel  } from "../secondaryPorts/ILoginRequestModel";

export class RequestModelMock implements ILoginRequestModel {
  data: any;

  constructor(data: any) {
    this.data = data;
  }

  getData(): { email: string; password: string; } {
    return {
      email: this.data.email,
      password: this.data.password,
    };
  }
}