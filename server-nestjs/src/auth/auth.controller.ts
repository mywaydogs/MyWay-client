import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtRefreshGuard } from 'src/jwt-refresh/jwt-refresh.guard';
import { AuthService } from './auth.service';
import { AccessTokenResponseBodyDto } from './dto/access-token-response-body.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req,
    @Res({ passthrough: true }) response,
  ): Promise<AccessTokenResponseBodyDto> {
    const { access_token, refresh_token } = await this.authService.login(
      req.user,
    );
    response.cookie('refreshToken', refresh_token, {
      signed: true,
      httpOnly: true,
      path: '/auth/refresh',
    });
    return { access_token };
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    return await this.authService.register(registerUserDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() req): Promise<AccessTokenResponseBodyDto> {
    return {
      access_token: await this.authService.generateAccessToken(req.user),
    };
  }
}
