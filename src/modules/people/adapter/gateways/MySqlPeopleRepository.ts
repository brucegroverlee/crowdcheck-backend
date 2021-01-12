import { MySqlBaseRepository } from "../../../shared/adapters/gateways/MySqlBaseRepository";
import { IDType } from "../../../shared/entities/types";
import { IPerson } from "../../entities/IPerson";
import { IPeopleRepository } from "../../useCases/sharedPorts/IPeopleRepository";

export class MySqlPeopleRepository extends MySqlBaseRepository<IPerson> implements IPeopleRepository {
  readonly tableName: string = "people";

  create(values: { name: string; createdBy: IDType; }): Promise<IPerson> {
    try {
      return super._create(values);
    } catch (error) {
      throw error;
    }
  }
}