import { ProductsService } from '../services/products.service.js';

export class ProductController {
  ProductsService = new ProductsService();
  createdProduct = async (req, res, next) => {
    try {
      const { title, description, status } = req.body;
      const user = res.locals.user;
      const id = user.userId;
      const name = user.name;

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

      const isValidStatus = status
        ? status === '판매 중' || status === '판매 종료'
        : true;

      if (!isValidStatus) {
        return res.status(400).json({
          success: false,
          message: '지원하지 않는 상태입니다. (status: 판매중 | 판매 종료)',
        });
      }

      const exitstProduct = await this.ProductsService.getProductTitle(title);

      if (exitstProduct) {
        return res.status(400).json({ message: '이미 존재하는 상품입니다.' });
      }

      const product = await this.ProductsService.createProduct(
        id,
        title,
        description,
        status,
      );
      return res.status(201).json({
        success: true,
        message: '상품 생성에 성공했습니다.',
        data: { ...product, name },
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
      const { sort } = req.query;
      let upperCaseSort = sort?.toUpperCase();
      if (upperCaseSort !== 'ASC' && upperCaseSort !== 'DESC') {
        upperCaseSort = 'DESC';
      }

      const products = await this.ProductsService.getAllProducts();

      if (!products) {
        return res.status(404).json({
          message: '상품을 조회할 수 없습니다.',
        });
      }

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
          message: '상품을 조회할 수 없습니다.',
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
      const { title, description, status, password } = req.body;
      const user = res.locals.user;

      if (password !== user.password) {
        return res.status(400).json({ message: '수정 권한이 없습니다.' });
      }

      const isValidStatus = status
        ? status === '판매 중' || status === '판매 종료'
        : true;

      if (!isValidStatus) {
        return res.status(400).json({
          success: false,
          message: '지원하지 않는 상태입니다. (status: 판매중 | 판매 종료)',
        });
      }

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
      const { password } = req.body;
      const product = await this.ProductsService.getProduct(productId);

      const user = res.locals.user;

      if (password !== user.password) {
        return res.status(400).json({ message: '수정 권한이 없습니다.' });
      }

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
