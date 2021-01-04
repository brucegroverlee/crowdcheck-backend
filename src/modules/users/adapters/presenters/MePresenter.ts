import { IMeResponseModel  } from "../../useCases/me/secondaryPorts/IMeResponseModel";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";

export class MePresenter implements IMeResponseModel {
  private readonly RESOLVE_STATUS_CODE: number = 200;

  constructor(private viewModel: ViewModel) {}

  resolve(user: { id: number; name: string; email: string; }, token: string): void {
    this.viewModel.resolve(this.RESOLVE_STATUS_CODE, { user, token, });
  }

  userDoesntExist(): void {
    this.viewModel.rejectConflict409("The user doesn\'t exist.");
  }
}