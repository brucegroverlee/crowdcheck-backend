import { IPerson } from "../../entities/IPerson";
import { IRepositories } from "../../../shared/useCases/secondaryPorts/IRepositories";
import { IDType } from "../../../shared/entities/types";

export interface IPeopleRepository extends IRepositories<IPerson> {
  create(values: {
    name: string;
    createdBy: IDType;
  }): Promise<IPerson>;
}