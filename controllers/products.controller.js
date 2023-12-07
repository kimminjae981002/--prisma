import { ProductsService } from '../services/products.service.js';

export class ProductController {
  ProductsService = new ProductsService();
  createdProduct = async (req, res, next) => {
    try {
      // console.log(res.locals.user);
      // const { id: userId, name: userName } = res.locals.user;
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
}
