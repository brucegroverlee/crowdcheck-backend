import { IDType } from "../../entities/types";

export interface IRepositories{
  create(values: any): Promise<IDType>;
  findOne(query: any): Promise<any|null>;
  /*
  findAndCountAll(
    where: any,
    pagination: {
      page: number,
      perPage: number
    }): Promise<{ count: number, rows: IRepositories[] }>;
  findById(id: IDType): Promise<IRepositories>;
  update(where: any, values: any): IRepositories[];
  destroy(where: any): Promise<number>;*/
}