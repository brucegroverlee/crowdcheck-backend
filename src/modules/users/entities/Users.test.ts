import { Users } from "./Users";
import { IUsersDocument } from "./IUsersDocument";
import { UsersRepositoryStub } from "./__stubs/UsersRepository.stub";
import { BcryptStub } from "./__stubs/Bcrypt.stub";
import { JwtStub } from "./__stubs/Jwt.stub";

describe("Users Entity", () => {
  it("should create and save a new entity", async () => {
    const repository = new UsersRepositoryStub();
    const bcrypt = new BcryptStub();
    const jwt = new JwtStub();
    const user = new Users(repository, bcrypt, jwt);
    await user.create({
      name: "grover",
      email: "grover@email.com",
      password: "1234",
    });
    expect(user.id).toBe(1);
    expect(user.name).toBe("grover");
    expect(user.password).toBe("**1234**");
    expect(user.createJWT()).toBe("{\"userId\":1}");
  });

  it("should set an existing user", () => {
    const repository = new UsersRepositoryStub();
    const bcrypt = new BcryptStub();
    const jwt = new JwtStub();
    const existingUser: IUsersDocument = {
      id: 10,
      name: "Bruce",
      email: "bruce@email.com",
      password: "**1234**",
      createdAt: new Date(),
    };
    const user = new Users(repository, bcrypt, jwt);
    user.set(existingUser);
    expect(user.id).toBe(10);
    expect(user.name).toBe("Bruce");
    expect(user.password).toBe("**1234**");
    expect(user.createJWT()).toBe("{\"userId\":10}");
  });
});