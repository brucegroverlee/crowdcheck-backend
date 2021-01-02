import { Signup } from "./Signup";
import { RepositoryMock } from "../../../shared/__mocks__/Repository.mock";
import { BcryptMock } from "../__mocks__/Bcrypt.mock";
import { JwtMock } from "../__mocks__/Jwt.mock";
import { PresenterMock } from "./__mocks__/SignupPresenter.mock";
import { RequestModelMock } from "./__mocks__/SignupRequestModel.mock";
import { SignupValidator } from "../../adapters/validator/SignupValidator";

describe("Signup useCase", () => {
  it("should signup a new user.", async () => {
    const usersRepository = new RepositoryMock();
    const bcrypt = new BcryptMock();
    const jwt = new JwtMock();
    const presenter = new PresenterMock();
    const validator = new SignupValidator();
    const requestModel = new RequestModelMock({
      name: "grover",
      email: "grover@email.com",
      password: "1234",
    });
    const signup = new Signup(usersRepository, bcrypt, jwt, presenter, validator);
    await signup.execute(requestModel);
    expect(typeof presenter.result).toBe("string");
    expect(presenter.result).toBe("{\"userId\":1}");
  });

  it("shouldn\'t signup a new user.", async () => {
    const usersRepository = new RepositoryMock();
    usersRepository.create({
      name: "grover",
      email: "grover@email.com",
      password: "**1234**",
    });
    const bcrypt = new BcryptMock();
    const jwt = new JwtMock();
    const presenter = new PresenterMock();
    const validator = new SignupValidator();
    const requestModel = new RequestModelMock({
      name: "grover",
      email: "grover@email.com",
      password: "1234",
    });
    const signup = new Signup(usersRepository, bcrypt, jwt, presenter, validator);
    await signup.execute(requestModel);
    expect(typeof presenter.result).toBe("string");
    expect(presenter.result).toBe("the user exists");
  });
});