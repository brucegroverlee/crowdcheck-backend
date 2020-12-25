import { IUsersRepository } from "../IUsersRepository";
import { IUsersDocument } from "../IUsersDocument";

export class UsersRepositoryStub implements IUsersRepository {
  counter: number;
  documents: IUsersDocument[];

  constructor() {
    this.counter = 1;
    this.documents = [];
  }

  async create(values: any): Promise<IUsersDocument> {
    const newUser : IUsersDocument = {
      id: this.counter,
      name: values.name,
      email: values.email,
      password: values.password,
      createdAt: new Date(),
    };
    this.documents.push(newUser);
    this.counter++;
    return newUser;
  }

  async findOne(query: any): Promise<IUsersDocument> {
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
}