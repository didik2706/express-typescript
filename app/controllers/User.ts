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

  static async updateUser(req: Request, res: Response) {
    // get id from params
    const { id } = req.params;

    // get data from body
    const { name, gender, birth_date } = req.body;
    
    // check user
    const user = await userRepository.findOne(User, {
      where: { id: +id },
      relations: {
        profile: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found"
      });
    }

    // update table user
    user.name = name;
    await userRepository.save(user);

    // update table profile
    await AppDataSource.getRepository(Profile).update(user.profile.id, { gender, birth_date });

    return res.json({
      success: true,
      message: "data user successfully updated :)"
    })
  }

  static async deleteUser(req: Request, res: Response) {
    // get id from params
    const { id } = req.params;

    // check user
    const user = await userRepository.findOne(User, {
      where: {
        id: +id
      }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found !!"
      });
    }

    await AppDataSource.getRepository(User).softDelete(id);

    return res.json({
      success: true,
      message: "user successfully deleted !!"
    });
  }

  static async restoreUser(req: Request, res: Response) {
    // get id from params
    const { id } = req.params;

    await AppDataSource.getRepository(User).restore(+id);

    return res.json({
      success: true,
      message: "user successfully restore !!"
    });
  }
}