import { prisma } from '../utils/prisma/index.js';

export class UserRepository {
  signUp = async (email, password, name) => {
    const newUser = await prisma.users.create({
      data: {
        email,
        name,
        password,
      },
    });

    return newUser;
  };
}
