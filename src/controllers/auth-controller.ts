import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../entity/user.entity";
import { encrypt } from "../util/encrypt";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(500)
          .json({ message: "email and password required" });
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = encrypt.comparepassword(user?.password, password);
      if (!isPasswordValid) {
        return res.status(404).json({ message: "Password not valid" });
      }
      const token = encrypt.generateToken({ id: user.id });

      delete user.password;

      return res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}