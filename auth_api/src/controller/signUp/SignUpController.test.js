const SignUpController = require("./SignUpController");
const UserRepository = require("../../repository/user/UserRepository");
const UserUtils = require("../../utils/test/UserUtils");
const { USER_EXISTS } = require("../../consts");

describe("Sign Up Controller", () => {
  const userRepository = new UserRepository({});
  const {
    id,
    password,
    ...data
  } = UserUtils.mock();
  const req = {
    body: {
      user: {
        ...data,
        password,
      }
    }
  };
  const res = {
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
