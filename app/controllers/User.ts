import { Request, Response } from "express";
import AppDataSource from "../../database";
import { Profile } from "../../database/models/Profile";
import { User } from "../../database/models/User";

// user repository
const userRepository = AppDataSource.manager;

export class UserController {
  static async getAllUser(req: Request, res: Response) {
    const users = await userRepository.find(User);

    return res.json(users);
  }

  static async addUser(req: Request, res: Response) {
    // get data from body
    const { name, email, password, gender, birth_date } = req.body;

    const profile = new Profile();
    profile.gender = gender;
    profile.birth_date = birth_date;
    await userRepository.save(profile);

    const user = await userRepository.insert(User, {
      name, email, password, profile
    });

    return res.status(201).json({
      success: true,
      message: "user successfully created",
      user
    })
  }

  static async getDetailUser(req: Request, res: Response) {
    // get id from params
    const { id } = req.params;

    const user = await userRepository.findOne(User, {
      relations: {
        profile: true
      },
      where: {
        id: +id
      }
    });

    return res.json(user)
  }
}