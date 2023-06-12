import { Request, Response } from "express";
import { USER_EXISTS } from "../../consts";
import UserRepository from "../../repository/user/UserRepository";

export default class SignUpController {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async handler(req: Request, res: Response) {
    try {
      const {
        password,
        ...user
      } = await this.userRepository.insert(req.body.user);

      return res.status(201).json({
        user
      });
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === USER_EXISTS) {
          return res.status(400).json({
            error: err.message
          });
        }
      }

      return res.status(500).json();
    }
  }
}
