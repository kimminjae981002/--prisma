import { UsersService } from '../services/users.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../constants/security.costant.js';
export class AuthController {
  UsersService = new UsersService();

  signUp = async (req, res, next) => {
    try {
      const { email, name, password, passwordConfirm } = req.body;

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

      const existedUser = await this.UsersService.findByEmail(email);

      if (existedUser) {
        return res.status(400).json({
          success: false,
          message: '이미 가입 된 이메일입니다.',
        });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await this.UsersService.signUp(
        email,
        name,
        hashedPassword,
        passwordConfirm,
      );

      return res.status(201).json({
        success: true,
        message: '회원가입에 성공했습니다.',
        data: newUser,
      });
    } catch (error) {
      next(error); // error핸들링 미들웨어로 보낸다/
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

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

      const user = await this.UsersService.findByEmail(email);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: '사용자가 존재하지 않습니다.',
        });
      }

      const accessToken = jwt.sign(
        { userId: user.userId },
        JWT_ACCESS_TOKEN_SECRET,
        {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
        },
      );
      const isPasswordMatched = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatched) {
        return res.status(400).json({
          message: '비밀번호가 틀립니다.',
        });
      }
      res.header('authorization', `Bearer ${accessToken}`);

      return res.status(200).json({
        success: true,
        message: '로그인에 성공했습니다.',
        data: { accessToken },
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
