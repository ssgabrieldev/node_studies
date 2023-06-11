const { USER_EXISTS } = require("../../consts");

module.exports = class SignUpController {
  userRepository;

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async handler(req, res) {
    try {
      const {
        password,
        ...user
      } = await this.userRepository.insert(req.body.user);

      return res.status(201).json({
        user
      });
    } catch (err) {
      if (err.message === USER_EXISTS) {
        return res.status(400).json({
          error: err.message
        });
      }

      return res.status(500).json();
    }
  }
}
