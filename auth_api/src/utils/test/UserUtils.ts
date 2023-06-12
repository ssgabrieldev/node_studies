export default class UserUtils {
  static mock() {
    return ({
      id: Math.random(),
      username: Math.random().toString(),
      email: Math.random().toString(),
      password: Math.random().toString()
    });
  }
}
