const DBConection = require("../../db/DBConetion");
const MockDBConnection = require("../../db/MockDBConnection");
const UserUtils = require("../../utils/test/UserUtils");
const User = require("./User");

describe("User Model", () => {
  DBConection.setConnection(MockDBConnection);

  it("should initiate user model with correct values", async () => {
    const data = UserUtils.mock();
    jest.spyOn(DBConection.connection.user, "create")
      .mockReturnValue(data);

    const user = new User(data);

    Object.keys(data).forEach((key) => {
      expect(user.data[key])
        .toBe(data[key]);
    });
  });
});
