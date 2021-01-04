import { BaseController } from "../../../shared/adapters/controllers/BaseController";
import { authentication } from "../../../shared/middlewares/authentication";
import { Request, Response, NextFunction } from "../../../../frameworks/express/CoreModules";
import { MySqlUserRepository } from "../gateways/MySqlUserRepository";
import { IUsersRepository } from "../../useCases/sharedPorts/IUsersRepository";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";
import { Bcrypt } from "../bcrypt/Bcrypt";
import { Jwt } from "../jwt/Jwt";
import { SignupPresenter } from "../presenters/SignupPresenter";
import { SignupRequestModel } from "../requestModels/SignupRequestModel";
import { SignupValidator } from "../validator/SignupValidator";
import { Signup } from "../../useCases/signup/Signup";
import { LoginPresenter } from "../presenters/LoginPresenter";
import { LoginRequestModel } from "../requestModels/LoginRequestModel";
import { LoginValidator } from "../validator/LoginValidator";
import { Login } from "../../useCases/login/Login";
import { MePresenter } from "../presenters/MePresenter";
import { AuthenticatedRequestModel } from "../../../shared/adapters/requestModel/AuthenticatedRequestModel";
import { Me } from "../../useCases/me/Me";

export class UsersController extends BaseController {
  public constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private usersRepository: IUsersRepository,
  ) {
    super();
    this.InitializeRoutes();
  }

  private InitializeRoutes() {
    this.router.post("/signup", this.Signup);
    this.router.post("/login", this.Login);
    this.router.get("/me", authentication, this.Me);
  }

  Signup = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
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

  Login = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const bcrypt = new Bcrypt();
      const jwt = new Jwt();
      const requestModel = new LoginRequestModel(request);
      const viewModel = new ViewModel(response);
      const presenter = new LoginPresenter(viewModel);
      const validator = new LoginValidator();
      const login = new Login(this.usersRepository, bcrypt, jwt, presenter, validator);
      await login.execute(requestModel);
    } catch (error) {
      next(error);
    }
  };

  Me = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const jwt = new Jwt();
      const requestModel = new AuthenticatedRequestModel(request);
      const viewModel = new ViewModel(response);
      const presenter = new MePresenter(viewModel);
      const me = new Me(this.usersRepository, jwt, presenter);
      await me.execute(requestModel);
    } catch (error) {
      next(error);
    }
  }
}

const usersRepository = new MySqlUserRepository();
const instance = new UsersController(usersRepository);

export default instance;
