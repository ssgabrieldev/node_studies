const DBConection = require("../../db/DBConetion");
const MockDBConnection = require("../../db/MockDBConnection");
const UserUtils = require("../../utils/test/UserUtils");
const User = require("./User");

describe("User Model", () => {
  DBConection.setConnection(MockDBConnection);

  it("should initiate user model with correct values", async () => {
    const data = UserUtils.mock();
    const user = new User(data);

    Object.keys(data).forEach((key) => {
      expect(user.data[key])
        .toBe(data[key]);
    });
  });

  it("should return user data and call 'findFirst' with correct params", async () => {
    const data = UserUtils.mock();

    const spyFindFirst = jest.spyOn(DBConection.connection.user, "findFirst")
      .mockReturnValue(data);

    const user = new User(data);
    const result = await user.find();

    Object.keys(data).forEach((key) => {
      expect(result[key])
        .toBe(data[key]);
    });

    expect(spyFindFirst)
      .toHaveBeenNthCalledWith(
        1,
        {
          where: {
            email: data.email
          }
        }
      );
  });

  it("shold call 'create' with correct params and return user data", async () => {
    const data = UserUtils.mock();

    const spyCreate = jest.spyOn(DBConection.connection.user, "create")
      .mockReturnValue(data);

    const user = new User(data);
    const result = await user.save();

    Object.keys(data).forEach((key) => {
      expect(result.data[key])
        .toBe(data[key]);
    });

    Object.keys(data).forEach((key) => {
      expect(user.data[key])
        .toBe(data[key]);
    });

    expect(spyCreate)
      .toHaveBeenNthCalledWith(
        1,
        {
          data: {
            username: data.username,
            email: data.email,
            password: data.password
          }
        }
      );
  });
});
