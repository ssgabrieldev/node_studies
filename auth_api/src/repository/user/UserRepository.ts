import { USER_EXISTS } from "../../consts";
import User from "../../model/user/User";
import UserData from "../../model/user/interface";

export default class UserRepository {
  user: typeof User;

  constructor(user: typeof User) {
    this.user = user;
  }

  async insert(data: UserData & { id?: number }) {
    const user = new this.user(data);

    const userExists = await user.find();

    if (userExists) {
      throw new Error(USER_EXISTS);
    }

    await user.save();

    return user.data;
  }
}
