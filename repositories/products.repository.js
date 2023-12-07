import { prisma } from '../utils/prisma/index.js';

export class ProductRepository {
  createProduct = async (UserId, title, description, status) => {
    const product = await prisma.products.create({
      data: {
        UserId,
        title,
        description,
        status,
      },
    });

    return product;
  };
}
