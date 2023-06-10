const { USER_EXISTS } = require("../../consts");

module.exports = class UserRepository {
  user;

  constructor(user) {
    this.user = user;
  }

  async insert(data) {
    const user = new this.user(data);

    const userExists = await user.find();

    if (userExists) {
      throw new Error(USER_EXISTS);
    }

    await user.save();

    return user.data;
  }
}
