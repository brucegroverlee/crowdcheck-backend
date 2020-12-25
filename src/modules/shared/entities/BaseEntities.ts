import { IEntities} from "./IEntities";
import { IRepositories} from "./IRepositories";
import { IDocuments } from "./IDocuments";

export class BaseEntities<G extends IDocuments> implements IEntities {
  constructor(private repository: IRepositories<G>) {}
  
  /**
   * Saves on Disk and sets the attributes in the Object
   * @param values 
   */
  async create(values: any): Promise<void> {
    try {
      const newDocument = await this.repository.create(values);
      this.set(newDocument);
    } catch (error) {
      throw error;
    }
  }

  set(values: G) {
    Object.assign(this, values);
  }
  /*
  update(where: any, values: any): IEntities[];
  destroy(where: any): Promise<number>;
  toJSON(): any;*/
}