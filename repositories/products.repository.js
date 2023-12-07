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

  getAllProducts = async () => {
    const products = await prisma.products.findMany();

    return products;
  };

  getProduct = async (productId) => {
    const product = await prisma.products.findFirst({
      where: { productId: +productId },
    });

    return product;
  };

  updateProduct = async (productId, title, description, status) => {
    const product = await prisma.products.update({
      where: { productId: +productId },
      data: {
        title,
        description,
        status,
      },
    });

    return product;
  };

  deleteProduct = async (productId) => {
    const product = await prisma.products.delete({
      where: { productId: +productId },
    });
    return product;
  };
}
