import { ISignupResponseModel  } from "../../useCases/signup/secondaryPorts/ISignupResponseModel";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";

export class SignupPresenter implements ISignupResponseModel {
  private readonly RESOLVE_STATUS_CODE: number = 200;

  constructor(private viewModel: ViewModel) {}

  resolve(token: string): void {
    this.viewModel.resolve(this.RESOLVE_STATUS_CODE, {token});
  }

  invalidData(errors: any[]): void {
    this.viewModel.rejectNotAcceptable406(errors);
  }
  userExists(): void {
    this.viewModel.rejectConflict409("The email is already registered.");
  }
}