import DBConection from "../../db/DBConetion";
import User from "../../model/user/User";
import UserData from "../../model/user/interface";
import UserUtils from "../../utils/test/UserUtils";
import UserRepository from "./UserRepository";

describe("User Repository", () => {
  it("should insert if user not exists", async () => {
    const data = UserUtils.mock();
    jest.spyOn(User.prototype, "find")
      .mockImplementation(async () => null);
    jest.spyOn(User.prototype, "save")
      .mockImplementation((async () => new User(data)));

    const userRepository = new UserRepository(
      User
    );

    const result = await userRepository.insert(data);

    (Object.keys(result) as (keyof UserData)[]).forEach((key) => {
      expect(result[key])
        .toBe(data[key]);
    });
  });

  it("should fail if user exists", async () => {
    const data = UserUtils.mock();
    jest.spyOn(User.prototype, "find")
      .mockImplementation(async () => data);

    const userRepository = new UserRepository(
      User
    );

    const result = userRepository.insert(data);

    expect(result)
      .rejects
      .toThrow();
  });
});
