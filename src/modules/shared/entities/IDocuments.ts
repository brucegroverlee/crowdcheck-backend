import { IDType } from "./types";

export interface IDocuments {
  [key: string]: any;
  id: IDType;
  createdAt: Date;
}