import { ILogin } from "./primaryPorts/ILogin";
import { IUsersRepository } from "../sharedPorts/IUsersRepository";
import { IBcrypt } from "../sharedPorts/IBcrypt";
import { IJwt } from "../sharedPorts/IJwt";
import { ILoginRequestModel } from "./secondaryPorts/ILoginRequestModel";
import { ILoginResponseModel } from "./secondaryPorts/ILoginResponseModel";
import { IValidator } from "./secondaryPorts/IValidator";
import { Users } from "../../entities/Users";

export class Login implements ILogin {
  constructor(
    private usersRepository: IUsersRepository,
    private bcrypt: IBcrypt,
    private jwt: IJwt,
    private responseModel: ILoginResponseModel,
    private validation: IValidator,
  ) {}

  async execute(requestModel: ILoginRequestModel): Promise<void> {
    try {
      const { errors, data } = this.validation.validateData(requestModel.getData());
      if (errors) {
        this.responseModel.invalidData(errors);
        return;
      }
      const doc = await this.usersRepository.findOne({ email: data.email });
      if (doc)  {
        const user = new Users(doc);
        const isCorrect = await this.bcrypt.verify(user, data.password);
        if (isCorrect) {
          const token = this.jwt.create(user.id);
          this.responseModel.resolve(token);
        } else {
          this.responseModel.passwordInvalid();
        }
      } else {
        this.responseModel.userDoesntExist();
      }
      return;
    } catch (error) {
      throw error;
    }
  }
}