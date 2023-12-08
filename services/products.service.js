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

  getAllProducts = async () => {
    const products = await this.ProductRepository.getAllProducts();

    return products;
  };

  getProduct = async (productId) => {
    const product = await this.ProductRepository.getProduct(productId);

    return product;
  };

  getProductTitle = async (title) => {
    const product = await this.ProductRepository.getProductTitle(title);

    return product;
  };

  updateProduct = async (productId, title, description, status) => {
    const product = await this.ProductRepository.getProduct(productId);

    await this.ProductRepository.updateProduct(
      productId,
      title,
      description,
      status,
    );

    const updateProduct = await this.ProductRepository.getProduct(productId);

    return {
      productId: updateProduct.productId,
      title: updateProduct.title,
      description: updateProduct.description,
      status: updateProduct.status,
    };
  };

  deleteProduct = async (productId) => {
    const product = await this.ProductRepository.deleteProduct(productId);

    return product;
  };
}
