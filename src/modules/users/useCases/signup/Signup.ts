import { IUsers } from "../../entities/IUsers";
import { IUsersRepository } from "../../entities/IUsersRepository";

export class Signup {
  constructor(
    private Users: IUsers,
    private UsersRepository: IUsersRepository
  ) {}

  async apply(values: {
    name: string;
    email: string;
    password: string;
  }): Promise<string | null> {
    try {
      const userDocument = await this.UsersRepository.findOne({ email: values.email});
      if (userDocument === null)  {
        await this.Users.create(values);
        return this.Users.createJWT();
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}