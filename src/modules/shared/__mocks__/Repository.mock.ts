import { IDType } from "../entities/types"
import { IRepositories } from "../useCases/secondaryPorts/IRepositories";

export class RepositoryMock implements IRepositories {
  counter: number;
  documents: any[];

  constructor() {
    this.counter = 1;
    this.documents = [];
  }

  async create(values: any): Promise<IDType> {
    const now = new Date();
    const newDocument: any = {
      ...values,
      id: this.counter,
      createdAt: now,
      updatedAt: now,
    };
    this.documents.push(newDocument);
    this.counter++;
    return newDocument.id;
  }

  async findOne(query: any): Promise<any> {
    const attributes = Object.keys(query);
    const result = this.documents.find((document) => {
      return attributes.every((attribute) => document[attribute] === query[attribute]);
    });
    if (result === undefined) {
      return null;
    } else {
      return result;
    }
  }

  findById(id: IDType): Promise<any|null> {
    return this.findOne({ id, });
  }
}