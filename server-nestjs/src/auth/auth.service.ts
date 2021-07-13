import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { FindOneUserDto } from 'src/users/dto/find-one-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { jwtConstants } from './constants';
import { InjectModel } from '@nestjs/mongoose';
import * as refreshTokenSchema from 'src/auth/schemas/refresh-token.schema';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(refreshTokenSchema.RefreshToken.name)
    private refreshTokensModel: Model<refreshTokenSchema.RefreshTokenDocument>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const findOneUserDto: FindOneUserDto = { username };
    const user = await this.usersService.findOne(findOneUserDto);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<any> {
    const accessTokenPayload = { username: user.username, sub: user._id };

    const refreshTokenPayload = { username: user.username, sub: user._id };

    const signedRefreshToken = this.jwtService.sign(refreshTokenPayload, {
      secret: jwtConstants.refresh_token_secret,
      expiresIn: jwtConstants.refresh_token_expires,
    });

    const refreshToken = new this.refreshTokensModel({
      user,
      token: signedRefreshToken,
    });

    await refreshToken.save();

    return {
      access_token: this.jwtService.sign(accessTokenPayload),
      // Can also be implemented as another provider - https://stackoverflow.com/a/59916105
      refresh_token: signedRefreshToken,
    };
  }
}
