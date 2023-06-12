import DBConnectionType from "./interface";

export default class DBConection {
  static connection: DBConnectionType;

  static setConnection(connection: DBConnectionType) {
    this.connection = connection;
  }
}
