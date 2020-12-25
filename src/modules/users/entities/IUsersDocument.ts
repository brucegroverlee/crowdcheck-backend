import { IDocuments } from "../../shared/entities/IDocuments";

export interface IUsersDocument extends IDocuments {
  name: string;
  email: string;
  password: string;
}