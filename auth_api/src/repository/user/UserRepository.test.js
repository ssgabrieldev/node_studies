const User = require("../../model/user/User");
const UserUtils = require("../../utils/test/UserUtils");
const UserRepository = require("./UserRepository");

describe("User Repository", () => {
  it("should not fail if user not exists", async () => {
    const data = UserUtils.mock();
    const spyFind = jest.spyOn(User.prototype, "find")
      .mockReturnValue(null);

    const userRepository = new UserRepository(
      User
    );

    const result = await userRepository.insert(data);

    Object.keys(result).forEach((key) => {
      expect(result[key])
        .toBe(data[key]);
    });

    spyFind.mockRestore();
  });

  it("should fail if user exists", async () => {
    const data = UserUtils.mock();
    const spyFind = jest.spyOn(User.prototype, "find")
      .mockReturnValue(data);

    const userRepository = new UserRepository(
      User
    );

    const result = userRepository.insert(data);

    expect(result)
      .rejects
      .toThrow();

    spyFind.mockRestore();
  });
});
