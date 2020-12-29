import { MySqlBaseRepository } from "../../../shared/adapters/gateways/MySqlBaseRepository";
import { IDType } from "../../../shared/entities/types"
import { IUsersRepository } from "../../useCases/signup/secondaryPorts/IUsersRepository";

export class MySqlUserRepository extends MySqlBaseRepository implements IUsersRepository {
  readonly tableName: string = "users";

  create(values: { name: string; email: string; password: string; }): Promise<IDType> {
    try {
      return super._create(values);
    } catch (error) {
      throw error;
    }
  }
}