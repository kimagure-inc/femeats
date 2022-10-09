import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  BadRequestException,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RecommendService } from 'src/recommend/recommend.service';
import { ContractsService } from 'src/contracts/contracts.service';
import { SubscribeService } from 'src/subscribe/subscribe.service';
import { ProductsService } from 'src/products/products.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
const nodemailer = require('nodemailer');
import { randomBytes } from 'crypto';
import { shippInfoService } from 'src/shippInfo/shippInfo.service';

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
    private contractsService: ContractsService,
    private subscribeService: SubscribeService,
    private productsService: ProductsService,
    private shippInfoService: shippInfoService,
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
        token: null,
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
      status: 200,
      message: 'success',
    };
  }

  @Get('/contract')
  async userContract(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.usersService.userOne(data['id']);
      const contract = await this.contractsService.contract(user.id);

      const { password, ...result } = user;

      return contract;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get()
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new BadRequestException('invalid credentials');
      }

      const user = await this.usersService.userOne(data['id']);

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get('all')
  async all(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new BadRequestException('invalid credentials');
      }
      const user = await this.usersService.userOne(data['id']);
      const contract = await this.contractsService.contract(user.id);
      const product = await this.productsService.products();
      const timezone = await this.shippInfoService.timezone();

      return { contract, product, timezone };
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
  //  会員更新
  @Patch()
  async upUser(
    @Body() data: Prisma.UserUpdateInput,
    @Req() request: Request,
  ): Promise<User> {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new BadRequestException('invalid credentials');
      }

      return this.usersService.updateUser({
        where: { id: Number(data['id']) },
        data: data,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  //  解約
  @Post('cancel')
  async cancel(
    @Body('id') id: string,
    @Body('userId') userId: string,
    @Req() request: Request,
  ) {
    console.log(id, userId);
    const cookie = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(cookie);
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    const contract = await this.contractsService.updateContract({
      where: { id: Number(userId) },
      data: {
        status_id: 3,
      },
    });

    const cancel = await this.subscribeService.cancel(id);

    return {
      cancel,
      contract,
    };
  }
  // 停止
  @Post('stop')
  async stop(
    @Body('id') id: string,
    @Body('userId') userId: string,
    @Req() request: Request,
  ) {
    console.log(id, userId);
    const cookie = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(cookie);
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    const contract = await this.contractsService.updateContract({
      where: { id: Number(userId) },
      data: { status_id: 2 },
    });

    const stop = await this.subscribeService.stop(id);

    return {
      stop,
      contract,
    };
  }
  // 再開
  @Post('restart')
  async restart(
    @Body('id') id: string,
    @Body('userId') userId: string,
    @Req() request: Request,
  ) {
    console.log(id, userId);
    const cookie = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(cookie);
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    const contract = await this.contractsService.updateContract({
      where: { id: Number(userId) },
      data: { status_id: 1 },
    });

    const restart = await this.subscribeService.restart(id);

    return {
      restart,
      contract,
    };
  }

  // 変更
  @Post('cs')
  async createCS(
    @Body('email') email: string,
    @Body('product_id') product_id: number,
    @Body('userid') userid: number,
    @Body('contractData') contractData,
    @Req() request: Request,
  ) {
    {
      console.log(userid);
    }
    const cookie = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(cookie);
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }
    const stripe_id = await this.productsService.stripeId(Number(product_id));
    const subsuc = await this.subscribeService.createCS(
      email,
      stripe_id[0].stripe_id,
    );
    console.log(subsuc);
    // contract更新
    const contract = await this.contractsService.updateContract({
      where: { id: Number(userid) },
      data: contractData,
    });
    // subsuc_id更新
    const updateUser = await this.usersService.updateUser({
      where: { id: Number(contract.user_id) },
      data: { stripe_sub_id: subsuc.subscribe_id },
    });

    return { subsuc, contract, updateUser };
  }
}
