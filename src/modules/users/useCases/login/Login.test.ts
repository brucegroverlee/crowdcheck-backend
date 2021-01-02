import { Login } from "./Login";
import { RepositoryMock } from "../../../shared/__mocks__/Repository.mock";
import { BcryptMock } from "../__mocks__/Bcrypt.mock";
import { JwtMock } from "../__mocks__/Jwt.mock";
import { PresenterMock } from "./__mocks__/LoginPresenter.mock";
import { RequestModelMock } from "./__mocks__/LoginRequestModel.mock";
import { LoginValidator } from "../../adapters/validator/LoginValidator";

describe("Login useCase", () => {
  it("should login the user.", async () => {
    const usersRepository = new RepositoryMock();
    usersRepository.create({
      name: "grover",
      email: "grover@email.com",
      password: "**1234**",
    });
    const bcrypt = new BcryptMock();
    const jwt = new JwtMock();
    const presenter = new PresenterMock();
    const validator = new LoginValidator();
    const requestModel = new RequestModelMock({
      email: "grover@email.com",
      password: "1234",
    });
    const login = new Login(usersRepository, bcrypt, jwt, presenter, validator);
    await login.execute(requestModel);
    expect(typeof presenter.result).toBe("string");
    expect(presenter.result).toBe("{\"userId\":1}");
  });

  it("shouldn\'t login the user. the user doesn\'t exist", async () => {
    const usersRepository = new RepositoryMock();
    const bcrypt = new BcryptMock();
    const jwt = new JwtMock();
    const presenter = new PresenterMock();
    const validator = new LoginValidator();
    const requestModel = new RequestModelMock({
      email: "grover@email.com",
      password: "1234",
    });
    const login = new Login(usersRepository, bcrypt, jwt, presenter, validator);
    await login.execute(requestModel);
    expect(typeof presenter.result).toBe("string");
    expect(presenter.result).toBe("the user doesn\'t exist");
  });

  it("shouldn\'t login the user. the password is not correct", async () => {
    const usersRepository = new RepositoryMock();
    usersRepository.create({
      name: "grover",
      email: "grover@email.com",
      password: "**1234**",
    });
    const bcrypt = new BcryptMock();
    const jwt = new JwtMock();
    const presenter = new PresenterMock();
    const validator = new LoginValidator();
    const requestModel = new RequestModelMock({
      email: "grover@email.com",
      password: "1235",
    });
    const login = new Login(usersRepository, bcrypt, jwt, presenter, validator);
    await login.execute(requestModel);
    expect(typeof presenter.result).toBe("string");
    expect(presenter.result).toBe("the password is not correct");
  });
});