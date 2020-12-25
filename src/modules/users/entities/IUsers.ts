import { IEntities } from "../../shared/entities/IEntities";
import { IUsersDocument } from "./IUsersDocument";

export interface IUsers extends IEntities, IUsersDocument {
  create(values: {
    name: string;
    email: string;
    password: string;
  }): Promise<void>;
  createJWT(): string;
}