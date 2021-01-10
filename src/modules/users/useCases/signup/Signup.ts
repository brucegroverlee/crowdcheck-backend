import { ISignup } from "./primaryPorts/ISignup";
import { IUsersRepository } from "../sharedPorts/IUsersRepository";
import { IBcrypt } from "../sharedPorts/IBcrypt";
import { IJwt } from "../sharedPorts/IJwt";
import { ISignupRequestModel } from "./secondaryPorts/ISignupRequestModel";
import { ISignupResponseModel } from "./secondaryPorts/ISignupResponseModel";
import { IValidator } from "./secondaryPorts/IValidator";

export class Signup implements ISignup {
  constructor(
    private usersRepository: IUsersRepository,
    private bcrypt: IBcrypt,
    private jwt: IJwt,
    private responseModel: ISignupResponseModel,
    private validation: IValidator,
  ) {}

  async execute(requestModel: ISignupRequestModel): Promise<void> {
    try {
      const { errors, data } = this.validation.validateData(requestModel.getData());
      if (errors) {
        this.responseModel.invalidData(errors);
        return;
      }
      const isAvailable = await this.usersRepository.isAvailable({ email: data.email });
      if (isAvailable)  {
        const hashedPassword = await this.bcrypt.hash(data.password);
        const user = await this.usersRepository.create({
          ...data,
          password: hashedPassword,
        });
        const token = this.jwt.create(user.id);
        this.responseModel.resolve(token);
      } else {
        this.responseModel.userExists();
      }
      return;
    } catch (error) {
      throw error;
    }
  }
}