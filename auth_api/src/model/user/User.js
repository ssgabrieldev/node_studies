module.exports = class User {
  id = 0;
  username = "";
  email = "";
  password = "";

  constructor(data) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key];
    });
  }
}
