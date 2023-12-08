import { prisma } from '../utils/prisma/index.js';

export class UserRepository {
  signUp = async (email, name, password) => {
    const newUser = await prisma.users.create({
      data: {
        email,
        name,
        password,
      },
    });

    return newUser;
  };

  findByEmail = async (email) => {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    return user;
  };

  findByUserId = async (userId) => {
    const user = await prisma.users.findUnique({
      where: { userId },
    });

    return user;
  };
}
