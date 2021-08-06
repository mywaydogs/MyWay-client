import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccessTokenPayloadDto } from '../auth/dto/access-token-payload.dto';
import { UsersService } from 'src/users/users.service';
import { config } from 'src/config/config';
import { Request } from 'express';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-strategy',
) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.signedCookies?.accessToken;
        },
      ]),
      secretOrKey: config.access_token_secret,
    });
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ignoreExpiration: false,
    //   secretOrKey: config.access_token_secret,
    //   signOptions: { expiresIn: config.access_token_expires },
    // });
  }

  async validate(payload: AccessTokenPayloadDto) {
    const user = await this.usersService.findUserById({
      id: payload.sub,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }
}
