import { ISignupResponseModel  } from "../../useCases/signup/ports/ISignupResponseModel";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";

export class SignupPresenter implements ISignupResponseModel {
  private readonly RESOLVE_STATUS_CODE: number = 200;

  constructor(private viewModel: ViewModel) {}

  resolve(token: string): void {
    this.viewModel.resolve(this.RESOLVE_STATUS_CODE, {token});
  }
  userExists(): void {
    this.viewModel.rejectConflict409("The email is already registered.");
  }
}