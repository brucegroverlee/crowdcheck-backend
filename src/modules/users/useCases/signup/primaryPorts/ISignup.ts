import { ISignupRequestModel } from "../secondaryPorts/ISignupRequestModel";

export interface ISignup {
  execute(requestModel: ISignupRequestModel): Promise<void>;
}