import { IDType } from "../../../../shared/entities/types";
import { IMeResponseModel  } from "../secondaryPorts/IMeResponseModel";

export class PresenterMock implements IMeResponseModel {
  result: any;

  resolve(
    user: {
      id: IDType;
      name: string;
      email: string;
    },
    token: string
  ): void {
    this.result = {
      user,
      token
    };
  }

  userDoesntExist(): void {
    this.result = "user doesn\'t exist";
  }
}