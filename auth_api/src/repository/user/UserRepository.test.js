const DBConection = require("../../db/DBConetion");
const MockDBConnection = require("../../db/MockDBConnection");
const User = require("../../model/user/User");
const UserUtils = require("../../utils/test/UserUtils");
const UserRepository = require("./UserRepository");

describe("User Repository", () => {
  DBConection.setConnection(MockDBConnection);

  it("should not fail if user not exists", async () => {
    const data = UserUtils.mock();
    jest.spyOn(User.prototype, "find")
      .mockReturnValue(null);
    jest.spyOn(DBConection.connection.user, "create")
      .mockReturnValue(data);

    const userRepository = new UserRepository(
      User
    );

    const result = await userRepository.insert(data);

    Object.keys(result).forEach((key) => {
      expect(result[key])
        .toBe(data[key]);
    });
  });

  it("should fail if user exists", async () => {
    const data = UserUtils.mock();
    jest.spyOn(User.prototype, "find")
      .mockReturnValue(data);

    const userRepository = new UserRepository(
      User
    );

    const result = userRepository.insert(data);

    expect(result)
      .rejects
      .toThrow();
  });
});
