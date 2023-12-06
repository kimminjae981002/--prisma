import { UserRepository } from '../repositories/users.repository.js';
import { prisma } from '../utils/prisma/index.js';
export class UsersService {
  UserRepository = new UserRepository();

  signUp = async (email, name, password, passwordConfirm) => {
    const user = await this.UserRepository.signUp(
      email,
      name,
      password,
      passwordConfirm,
    );

    return {
      userId: user.userId,
      name: user.name,
      cretaedAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };
}
