const UserUtils = require("../../utils/test/UserUtils");
const User = require("./User");

describe("User Model", () => {
  it("should initiate user model with correct values", async () => {
    const data = UserUtils.mock();
    const user = new User(data);

    Object.keys(data).forEach((key) => {
      expect(user.data[key])
        .toBe(data[key]);
    });
  });
});
