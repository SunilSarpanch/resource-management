import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../entity/user.entity";
import { encrypt } from "../util/encrypt";
import * as cache from "memory-cache";

export class UserController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const encryptedPassword = await encrypt.encryptpass(password);
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = encryptedPassword;

      const userRepository = AppDataSource.getRepository(User);

      const dbUser = await userRepository.findOne({ where: { email } });

      if (dbUser) {
        return res.status(404).json({ message: "Email already exist" });
      }

      await userRepository.save(user);

      const token = encrypt.generateToken({ id: user.id });

      return res
        .status(200)
        .json({ message: "User created successfully", token, user });
    } catch (err) {
      next(err);
    }
  }
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.name = name || user.name;
      user.email = email || user.email;

      if (password) {
        const encryptedPassword = await encrypt.encryptpass(password);
        user.password = encryptedPassword;
      }
      await userRepository.save(user);
      res.status(200).json({ message: "udpdate", user });
    } catch (err) {
      next(err);
    }
  }
  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id },
      });
      await userRepository.remove(user);
      res.status(200).json({ message: "ok" });
    } catch (err) {
      next(err);
    }
  }
}
