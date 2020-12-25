import { IDType } from "../../shared/entities/types";
import { BaseEntities } from "../../shared/entities/BaseEntities";
import { IUsers } from "./IUsers";
import { IUsersDocument } from "./IUsersDocument";
import { IUsersRepository } from "./IUsersRepository";
import { IBcrypt } from "./IBcrypt";
import { IJwt } from "./IJwt";

export class Users extends BaseEntities<IUsersDocument> implements IUsers {
  id: IDType;
  name: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor(
    repository: IUsersRepository,
    private bcrypt: IBcrypt,
    private jwt: IJwt
    ) {
    super(repository);
  }

  async create(values: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> {
    const hashedPassword = await this.getHashedPassword(values.password);
    return super.create({
      ...values,
      password: hashedPassword,
    });
  }

  private async getHashedPassword(password: string): Promise<string> {
    try {
      const hashedPassword = await this.bcrypt.hash(password);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }

  createJWT(): string {
    return this.jwt.create(this.id);
  }
}
