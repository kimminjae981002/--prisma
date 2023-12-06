import { UsersService } from '../services/users.service.js';
import { prisma } from '../utils/prisma/index.js';

export class AuthController {
  UsersService = new UsersService();

  signUp = async (req, res, next) => {
    try {
      const { email, name, password, passwordConfirm } = req.body;

      const newUser = await this.UsersService.signUp(
        email,
        name,
        password,
        passwordConfirm,
      );

      if (!email) {
        return res.status(400).json({
          success: false,
          message: '이메일 입력이 필요합니다.',
        });
      }

      if (!password) {
        return res.status(400).json({
          success: false,
          message: '비밀번호 입력이 필요합니다.',
        });
      }

      if (!passwordConfirm) {
        return res.status(400).json({
          success: false,
          message: '비밀번호 확인 입력이 필요합니다.',
        });
      }

      if (!name) {
        return res.status(400).json({
          success: false,
          message: '이름 입력이 필요합니다.',
        });
      }

      if (password !== passwordConfirm) {
        return res.status(400).json({
          success: false,
          message: '입력 한 비밀번호가 서로 일치하지 않습니다.',
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: '비밀번호는 최소 6자리 이상입니다.',
        });
      }

      let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
      const isValidEmail = emailValidationRegex.test(email);
      if (!isValidEmail) {
        return res.status(400).json({
          success: false,
          message: '올바른 이메일 형식이 아닙니다.',
        });
      }

      return res.status(201).json({
        success: true,
        message: '회원가입에 성공했습니다.',
        data: newUser,
      });
    } catch (error) {
      next(error); // error핸들링 미들웨어로 보낸다/
    }
  };
}
