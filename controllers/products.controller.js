import { ProductsService } from '../services/products.service.js';

export class ProductController {
  ProductsService = new ProductsService();
  createdProduct = async (req, res, next) => {
    try {
      const { title, description, status } = req.body;

      if (!title) {
        return res.status(400).json({
          success: false,
          message: '제목 입력이 필요합니다.',
        });
      }

      if (!description) {
        return res.status(400).json({
          success: false,
          message: '설명 입력이 필요합니다.',
        });
      }

      const product = await this.ProductsService.createProduct(
        res.locals.user,
        title,
        description,
        status,
      );
      return res.status(201).json({
        success: true,
        message: '상품 생성에 성공했습니다.',
        data: product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };

  getAllProducts = async (req, res, next) => {
    try {
      // const { sort } = req.query;
      // let upperCaseSort = sort?.toUpperCase();
      // if (upperCaseSort !== 'ASC' && upperCaseSort !== 'DESC') {
      //   upperCaseSort = 'DESC';
      // }

      const products = await this.ProductsService.getAllProducts();

      return res.status(200).json({
        success: true,
        message: '상품 목록 조회에 성공했습니다.',
        data: products,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };

  getProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await this.ProductsService.getProduct(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: '상품이 존재하지 않습니다.',
        });
      }

      return res.status(200).json({
        success: true,
        message: '상품 목록 조회에 성공했습니다.',
        data: product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { password, title, description, status } = req.body;

      const updatedProduct = await this.ProductsService.updateProduct(
        productId,
        title,
        description,
        status,
      );

      return res.status(201).json({ data: updatedProduct });
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;

      const product = await this.ProductsService.getProduct(productId);

      if (!product) {
        return res.status(404).json({ message: '상품을 조회할 수 없습니다.' });
      }
      await this.ProductsService.deleteProduct(productId);
      return res.status(200).json({ message: '상품이 삭제되었습니다.' });
    } catch (error) {
      next(error);
    }
  };
}
