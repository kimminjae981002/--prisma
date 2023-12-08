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

  getAllProducts = async (sort) => {
    sort = sort?.toLowerCase();

    if (sort !== 'asc' && sort !== 'desc') {
      sort = 'desc';
    }

    const products = await prisma.products.findMany({
      orderBy: { createdAt: sort },
    });

    return products;
  };

  getProduct = async (productId) => {
    const product = await prisma.products.findFirst({
      where: { productId: +productId },
    });

    if (!product) {
      throw Error('페이지를 조회할 수 없습니다.');
    }

    return product;
  };

  getProductTitle = async (title) => {
    const product = await prisma.products.findFirst({
      where: { title },
    });

    if (!product) {
      throw Error('페이지를 조회할 수 없습니다.');
    }

    return product;
  };

  updateProduct = async (productId, title, description, status) => {
    const product = await prisma.products.findFirst({
      where: { productId: +productId },
    });

    if (!product) {
      throw Error('페이지를 조회할 수 없습니다.');
    }

    const updatedProduct = await prisma.products.update({
      where: { productId: +productId },
      data: {
        title,
        description,
        status,
      },
    });

    return updatedProduct;
  };

  deleteProduct = async (productId) => {
    const product = await prisma.products.findFirst({
      where: { productId: +productId },
    });

    if (!product) {
      throw Error('페이지를 조회할 수 없습니다.');
    }

    const deletedProduct = await prisma.products.delete({
      where: { productId: +productId },
    });
    return deletedProduct;
  };
}
