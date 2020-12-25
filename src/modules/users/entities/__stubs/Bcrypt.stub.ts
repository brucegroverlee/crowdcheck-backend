import { IBcrypt } from "../IBcrypt";

export class BcryptStub implements IBcrypt {
  async hash(password: string): Promise<string> {
    return `**${password}**`;
  }
  verify(password: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
}