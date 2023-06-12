import SignUpController from "./SignUpController";
import UserRepository from "../../repository/user/UserRepository";
import UserUtils from "../../utils/test/UserUtils";
import { USER_EXISTS } from "../../consts";
import User from "../../model/user/User";

describe("Sign Up Controller", () => {
  const userRepository = new UserRepository(({}) as typeof User);
  const {
    id,
    password,
    ...data
  } = UserUtils.mock();
  const req: any = {
    body: {
      user: {
        ...data,
        password,
      }
    }
  };
  const res: any = {
    status: jest.fn(() => res),
    json: jest.fn()
  };

  it("should return response with user data", async () => {
    const spyInsert = jest.spyOn(userRepository, "insert")
      .mockImplementation(async () => ({
        ...data,
        id,
        password
      }));

    const signUpController = new SignUpController(userRepository);

    await signUpController.handler(req, res);

    expect(spyInsert)
      .toHaveBeenCalledWith(req.body.user);
    expect(res.status)
      .toHaveBeenCalledWith(201);
    expect(res.json)
      .toHaveBeenCalledWith({
        user: {
          ...data,
          id
        }
      });
  });

  it(`should return response with error ${USER_EXISTS}`, async () => {
    const spyInsert = jest.spyOn(userRepository, "insert")
      .mockImplementation(async () => {
        throw new Error(USER_EXISTS);
      });

    const signUpController = new SignUpController(userRepository);

    await signUpController.handler(req, res);

    expect(spyInsert)
      .toHaveBeenCalledWith(req.body.user);
    expect(res.status)
      .toHaveBeenCalledWith(400);
    expect(res.json)
      .toHaveBeenCalledWith({
        error: USER_EXISTS
      });
  });

  it("should return response with error 500", async () => {
    const spyInsert = jest.spyOn(userRepository, "insert")
      .mockImplementation(async () => {
        throw new Error();
      });

    const signUpController = new SignUpController(userRepository);

    await signUpController.handler(req, res);

    expect(spyInsert)
      .toHaveBeenCalledWith(req.body.user);
    expect(res.status)
      .toHaveBeenCalledWith(500);
    expect(res.json)
      .toHaveBeenCalledTimes(1);
  });
});
