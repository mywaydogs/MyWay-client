import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenPayloadDto } from 'src/auth/dto/refresh-token-payload.dto';
import { config } from 'src/config/config';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-strategy',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.signedCookies?.refreshToken;
        },
      ]),
      secretOrKey: config.refresh_token_secret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: RefreshTokenPayloadDto) {
    const refreshToken = request?.signedCookies?.refreshToken;
    return this.authService.getUserIfRefreshTokenIsValid(payload, refreshToken);
  }
}
