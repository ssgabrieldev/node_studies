import DBConnection from "../../db/DBConetion";
import UserData from "./interface";

export default class User {
  data: UserData = {
    id: 0,
    username: "",
    email: "",
    password: ""
  };

  constructor(data: Partial<UserData>) {
    this.data = {
      ...this.data,
      ...data
    };
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
    const user = await DBConnection
      .connection
      .user
      .findFirst({
        where: {
          email: this.data.email
        }
      });

    return user;
  }
}
