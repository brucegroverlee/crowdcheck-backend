import { ILoginResponseModel  } from "../../useCases/login/ports/ILoginResponseModel";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";

export class LoginPresenter implements ILoginResponseModel {
  private readonly RESOLVE_STATUS_CODE: number = 200;

  constructor(private viewModel: ViewModel) {}

  resolve(token: string): void {
    this.viewModel.resolve(this.RESOLVE_STATUS_CODE, {token});
  }

  userDoesntExist(): void {
    this.viewModel.rejectUnauthorized401("The email doesn\'t exist.");
  }
  passwordInvalid(): void {
    this.viewModel.rejectUnauthorized401("The password is not correct.");
  }
}