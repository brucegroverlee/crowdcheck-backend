import { IDocuments } from "./IDocuments";

export interface IRepositories<D extends IDocuments> {
  create(values: any): Promise<D>;
  findOne(query: any): Promise<D | null>;
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