import { IDType } from "../../entities/types";

export interface IAuthenticatedRequestModel {
  getUser(): { userId: IDType; };
}