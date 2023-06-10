const DBConnection = require("../../db/DBConetion");

module.exports = class User {
  data = {
    id: 0,
    username: "",
    email: "",
    password: "",
  };

  constructor(data) {
    Object.keys(data).forEach((key) => {
      this.data[key] = data[key];
    });
  }

  async save() {
    const user = await DBConnection
      .connection
      .user
      .create({
        data: {
          username: this.data.username,
          email: this.data.email,
          password: this.data.password
        }
      });

    this.data.id = user.id;

    return this;
  }

  async find() {
    const where = {};
    const {
      email
    } = this.data;

    if (email) {
      where.email = email;
    }

    const user = await DBConnection
      .connection
      .user
      .findFirst({
        where
      });

    return user;
  }
}
