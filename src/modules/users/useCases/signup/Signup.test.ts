import { Signup } from "./Signup";
import { Users } from "../../entities/Users";
import { UsersRepositoryStub } from "../../entities/__stubs/UsersRepository.stub";
import { BcryptStub } from "../../entities/__stubs/Bcrypt.stub";
import { JwtStub } from "../../entities/__stubs/Jwt.stub";

describe("Signup useCase", () => {
  it("should signup a new user.", async () => {
    const usersRepository = new UsersRepositoryStub();
    const bcrypt = new BcryptStub();
    const jwt = new JwtStub();
    const user = new Users(usersRepository, bcrypt, jwt);
    const signup = new Signup(user, usersRepository);
    const token = await signup.apply({
      name: "grover",
      email: "grover@email.com",
      password: "1234",
    });
    expect(typeof token).toBe("string");
    expect(token).toBe("{\"userId\":1}");
  });

  it("shouldn\'t signup a new user.", async () => {
    const usersRepository = new UsersRepositoryStub();
    const bcrypt = new BcryptStub();
    const jwt = new JwtStub();
    usersRepository.create({
      name: "grover",
      email: "grover@email.com",
      password: "**1234**",
    });
    const user = new Users(usersRepository, bcrypt, jwt);
    const signup = new Signup(user, usersRepository);
    const token = await signup.apply({
      name: "grover",
      email: "grover@email.com",
      password: "1234",
    });
    expect(typeof token).toBe("object");
    expect(token).toBe(null);
  });
});