import { Request } from "express";
import { IDType } from "../../entities/types";
import { IAuthenticatedRequestModel } from "../../useCases/secondaryPorts/IAuthenticatedRequestModel"

export interface IAuthenticatedRequest extends Request {
  user: {
    userId: IDType;
  };
}

export class AuthenticatedRequestModel implements IAuthenticatedRequestModel {
  constructor(private request: Request) {}

  getUser(): { userId: IDType; } {
    const { user } = this.request as IAuthenticatedRequest;
    return user;
  }
}