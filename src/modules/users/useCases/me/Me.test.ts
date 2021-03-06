import { Me } from "./Me";
import { RepositoryMock } from "../../../shared/__mocks__/Repository.mock";
import { JwtMock } from "../__mocks__/Jwt.mock";
import { PresenterMock} from "./__mocks__/MePresenter.mock";
import { AuthenticatedRequestModel, IAuthenticatedRequest } from "../../../shared/adapters/requestModel/AuthenticatedRequestModel";

describe("Me useCase", () => {
  it("should returns the user data.", async () => {
    const usersRepository = new RepositoryMock();
    usersRepository.create({
      name: "grover",
      email: "grover@email.com",
      password: "**1234**",
    });
    const jwt = new JwtMock();
    const request: any = {
      user: {
        userId: 1
      },
    } as IAuthenticatedRequest;
    const presenter = new PresenterMock();
    const requestModel = new AuthenticatedRequestModel(request);
    const me = new Me(usersRepository, jwt, presenter);
    await me.execute(requestModel);
    expect(typeof presenter.result).toBe("object");
    expect(typeof presenter.result.token).toBe("string");
    expect(presenter.result.token).toBe("{\"userId\":1}");
  });

  it("shouldn\'t returns a user data.", async () => {
    const usersRepository = new RepositoryMock();
    const jwt = new JwtMock();
    const request: any = {
      user: {
        userId: 1
      },
    } as IAuthenticatedRequest;
    const presenter = new PresenterMock();
    const requestModel = new AuthenticatedRequestModel(request);
    const me = new Me(usersRepository, jwt, presenter);
    await me.execute(requestModel);
    expect(typeof presenter.result).toBe("string");
    expect(presenter.result).toBe("user doesn\'t exist");
  });
});