import { IDType } from "../../../../shared/entities/types"
import { IUsersRepository } from "../secondaryPorts/IUsersRepository";
import { IUsers } from "../../../entities/IUsers";

export class UsersRepositoryMock implements IUsersRepository {
  counter: number;
  documents: IUsers[];

  constructor() {
    this.counter = 1;
    this.documents = [];
  }

  async create(values: any): Promise<IDType> {
    const now = new Date();
    const newUser : IUsers = {
      id: this.counter,
      name: values.name,
      email: values.email,
      password: values.password,
      createdAt: now,
      updatedAt: now,
    };
    this.documents.push(newUser);
    this.counter++;
    return newUser.id;
  }

  async findOne(query: any): Promise<IUsers> {
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