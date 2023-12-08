import { UserRepository } from '../repositories/users.repository.js';

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

  findByEmail = async (email) => {
    const user = await this.UserRepository.findByEmail(email);

    return user;
  };

  findByUserId = async (userId) => {
    const user = await this.UserRepository.findByUserId(userId);

    return user;
  };
}
