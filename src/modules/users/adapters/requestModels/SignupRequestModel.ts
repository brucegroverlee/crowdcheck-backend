import { ISignupRequestModel  } from "../../useCases/signup/secondaryPorts/ISignupRequestModel";
import { Request } from "../../../../frameworks/express/CoreModules";

export class SignupRequestModel implements ISignupRequestModel {

  constructor(private request: Request) {}

  getData(): { name: string; email: string; password: string; } {
    const body = this.request.body
    return {
      name: body.name,
      email: body.email,
      password: body.password,
    };
  }
}