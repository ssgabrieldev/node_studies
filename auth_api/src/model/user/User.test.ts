import DBConection from "../../db/DBConetion";
import MockDBConnection from "../../utils/test/MockDBConnection";
import UserUtils from "../../utils/test/UserUtils";
import User from "./User";
import UserData from "./interface";

describe("User Model", () => {
  DBConection.setConnection(MockDBConnection.mock());

  it("should initiate user model with correct values", async () => {
    const data = UserUtils.mock();
    const user = new User(data);

    (Object.keys(data) as (keyof UserData)[]).forEach((key) => {
      expect(user.data[key])
        .toBe(data[key]);
    });
  });

  it("should return user data and call 'findFirst' with correct params", async () => {
    const data = UserUtils.mock();

    const spyFindFirst = jest.spyOn(DBConection.connection.user, "findFirst")
      .mockReturnValue(data as any);

    const user = new User(data);
    const result = await user.find();

    (Object.keys(data) as (keyof UserData)[]).forEach((key) => {
      expect(result![key])
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
      .mockReturnValue(data as any);

    const user = new User(data);
    const result = await user.save();

    (Object.keys(data) as (keyof UserData)[]).forEach((key) => {
      expect(result.data[key])
        .toBe(data[key]);
    });

    (Object.keys(data) as (keyof UserData)[]).forEach((key) => {
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
