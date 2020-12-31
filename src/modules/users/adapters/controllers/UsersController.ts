import { BaseController } from "../../../shared/adapters/controllers/BaseController";
import { Request, Response, NextFunction } from "../../../../frameworks/express/CoreModules";
import { MySqlUserRepository } from "../gateways/MySqlUserRepository";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";
import { Bcrypt } from "../bcrypt/Bcrypt";
import { Jwt } from "../jwt/Jwt";
import { SignupPresenter } from "../presenters/SignupPresenter";
import { SignupRequestModel } from "../requestModels/SignupRequestModel";
import { SignupValidator } from "../validator/SignupValidator";
import { Signup } from "../../useCases/signup/Signup";

export class UsersController extends BaseController {
  public constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private usersRepository: MySqlUserRepository
  ) {
    super();
    this.InitializeRoutes();
  }

  private InitializeRoutes() {
    this.router.post("/signup", this.PostSignup);
  }

  PostSignup = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const bcrypt = new Bcrypt();
      const jwt = new Jwt();
      const requestModel = new SignupRequestModel(request);
      const viewModel = new ViewModel(response);
      const presenter = new SignupPresenter(viewModel);
      const validator = new SignupValidator();
      const signup = new Signup(this.usersRepository, bcrypt, jwt, presenter, validator);
      await signup.execute(requestModel);
    } catch (error) {
      next(error);
    }
  };
}

const usersRepository = new MySqlUserRepository();
const instance = new UsersController(usersRepository);

export default instance;
