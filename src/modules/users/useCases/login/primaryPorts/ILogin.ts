import { ILoginRequestModel } from "../secondaryPorts/ILoginRequestModel";

export interface ILogin {
  execute(requestModel: ILoginRequestModel): Promise<void>;
}