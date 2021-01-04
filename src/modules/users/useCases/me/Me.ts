import { IAuthenticatedRequestModel } from "modules/shared/useCases/secondaryPorts/IAuthenticatedRequestModel";
import { IUsersRepository } from "../sharedPorts/IUsersRepository";
import { IJwt } from "../sharedPorts/IJwt";
import{ IMeResponseModel } from "./secondaryPorts/IMeResponseModel";

export class Me {
  constructor(
    private usersRepository: IUsersRepository,
    private jwt: IJwt,
    private response: IMeResponseModel,
  ) {}

  async execute(request: IAuthenticatedRequestModel): Promise<void> {
    try {
      const userRequest = request.getUser();
      const user = await this.usersRepository.findById(userRequest.userId);
      if (user) {
        const token = this.jwt.create(userRequest.userId);
        this.response.resolve({
          id: user.id,
          name: user.name,
          email: user.email,
        }, token);
      } else {
        this.response.userDoesntExist();
      }
      return;
    } catch (error) {
      throw error;
    }
  }
}