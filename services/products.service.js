import { ProductRepository } from '../repositories/products.repository.js';
export class ProductsService {
  ProductRepository = new ProductRepository();

  createProduct = async (UserId, title, description, status) => {
    const product = await this.ProductRepository.createProduct(
      UserId,
      title,
      description,
      status,
    );

    return {
      UserId: product.UserId,
      title: product.title,
      description: product.description,
      status: product.status,
    };
  };
}
