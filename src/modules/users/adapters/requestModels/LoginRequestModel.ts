import { ILoginRequestModel  } from "../../useCases/login/secondaryPorts/ILoginRequestModel";
import { Request } from "../../../../frameworks/express/CoreModules";

export class LoginRequestModel implements ILoginRequestModel {

  constructor(private request: Request) {}

  getData(): { email: string; password: string; } {
    const body = this.request.body
    return {
      email: body.email,
      password: body.password,
    };
  }
}