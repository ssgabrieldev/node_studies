import DBConnectionType from "../../db/interface";

export default class MockDBConnection {
  public static mock() {
    return ({
      user: {
        findFirst: (async () => {}) as any,
        create: (async () => {}) as any
      }
    }) as DBConnectionType;
  }
};
