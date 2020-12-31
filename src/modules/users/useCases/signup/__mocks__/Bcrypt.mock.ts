import { IBcrypt } from "../secondaryPorts/IBcrypt";
import { IUsers } from "../../../entities/IUsers";

export class BcryptMock implements IBcrypt {
  async hash(password: string): Promise<string> {
    return `**${password}**`;
  }
  verify(user: IUsers, password: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}