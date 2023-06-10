module.exports = class AuthController {
  userRepository;

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async handler(req, res) {
    const {
      password,
      ...user
    } = await this.userRepository.insert(req.body.user);

    return res.json({
      user
    });
  }
}
