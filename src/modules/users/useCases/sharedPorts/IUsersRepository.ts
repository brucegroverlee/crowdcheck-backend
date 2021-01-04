import { IRepositories } from "../../../shared/useCases/secondaryPorts/IRepositories";
import { IDType } from "../../../shared/entities/types";

export interface IUsersRepository extends IRepositories{
  create(values: {
    name: string;
    email: string;
    password: string;
  }): Promise<IDType>;
}