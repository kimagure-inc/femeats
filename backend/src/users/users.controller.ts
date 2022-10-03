import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  BadRequestException,
  Res,
  Req,
  UnauthorizedException,
  Redirect,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RecommendService } from 'src/recommend/recommend.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
const nodemailer = require('nodemailer');
import { randomBytes } from 'crypto';
import { runInThisContext } from 'vm';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 25,
  secure: true,
  auth: {
    user: 'femeats@gmail.com',
    pass: 'nzcmdicuwturrpvy',
  },
});

@Controller('user')
export class UsersController {
  logger: any;
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private recommendService: RecommendService,
  ) {}
  // もし1回でも保存していたらupdate
  @Post('signup')
  async authUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('product_id') product_id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const token = randomBytes(16).toString('hex');
    const jwt = await this.jwtService.signAsync({ id: token });
    // const hashedToken = await bcrypt.hash(token, 12);

    await this.usersService
      .signUpUser({
        email,
        password: hashedPassword,
        token: token,
      })
      .then(() => {
        let details = {
          from: 'femeats@gmail.com',
          to: email,
          subject: 'femeats',
          text: `femeatsをご利用いただき誠にありがとうございます。\n 24時間以内に以下のURLをクリックして、認証を行なってください。\n http://localhost:8080/email?token=${jwt}`,
        };
        transporter.sendMail(details, (err) => {
          if (err) {
            console.log('it has an error', err);
            response.status(500).send({
              message: 'it has an error',
            });
          } else {
            console.log('email has send');
            response.send({
              message: 'success',
            });
          }
        });
      });
    const data = {
      product_id: Number(product_id),
      email: email,
    };
    const recommend = await this.recommendService.createRecommend(data);
    return recommend;
  }

  @Get('auth/:token')
  async auth(@Param('token') token: string) {
    const data = await this.jwtService.verifyAsync(token);
    const user = await this.usersService.tokenOne(data['id']);

    if (!data) {
      throw new UnauthorizedException();
    }

    await this.usersService.updateUser({
      where: { id: user.id },
      data: {
        emailAuth: true,
      },
    });
    const { password, ...result } = user;

    const recommend = await this.recommendService.recommend(user.email);
    return {
      user,
      recommend,
    };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('login');
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'success',
    };
  }

  @Get()
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.usersService.userOne(data['id']);

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }

  // 会員登録
  // tokenをnullにする
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.updateUser({
      where: { id: Number(id) },
      data: data,
    });
  }
}
