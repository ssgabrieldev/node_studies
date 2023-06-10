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
    return this;
  }

  async find() {}
}
