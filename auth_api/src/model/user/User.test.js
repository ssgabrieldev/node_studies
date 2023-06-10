const User = require("./User");

describe("User Model", () => {
  it("should initiate user model with correct values", async () => {
    const data = {
      id: Math.random(),
      username: Math.random().toString(),
      email: Math.random().toString(),
      password: Math.random().toString()
    };
    const user = new User(data);

    Object.keys(data).forEach((key) => {
      expect(user[key])
        .toBe(data[key]);
    });
  });
});
