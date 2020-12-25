export interface IEntities {
  create(values: any): Promise<void>;
  /*
  update(where: any, values: any): T[];
  destroy(where: any): Promise<number>;
  toJSON(): any;*/
}