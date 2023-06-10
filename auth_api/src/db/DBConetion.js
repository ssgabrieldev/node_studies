module.exports = class DBConection {
  static connection;

  static setConnection(connection) {
    this.connection = connection;
  }
}
