import { IRepositories } from "../../../shared/useCases/secondaryPorts/IRepositories";
import { IUsers } from "../../entities/IUsers";

export interface IUsersRepository extends IRepositories<IUsers>{
  create(values: {
    name: string;
    email: string;
    password: string;
  }): Promise<IUsers>;
}