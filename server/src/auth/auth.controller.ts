import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessGuard } from 'src/jwt-access/jwt-access.guard';
import { JwtRefreshGuard } from 'src/jwt-refresh/jwt-refresh.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) response): Promise<void> {
    const { access_token, refresh_token } = await this.authService.login(
      req.user,
    );
    response.cookie('refreshToken', refresh_token, {
      signed: true,
      httpOnly: true,
      path: '/api/auth/refresh',
    });
    response.cookie('accessToken', access_token, {
      signed: true,
      httpOnly: true,
      path: '/api',
    });
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    return await this.authService.register(registerUserDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(
    @Req() req,
    @Res({ passthrough: true }) response,
  ): Promise<void> {
    response.cookie(
      'accessToken',
      await this.authService.generateAccessToken(req.user),
      {
        signed: true,
        httpOnly: true,
        path: '/api',
      },
    );
  }

  @UseGuards(JwtAccessGuard)
  @Get('logout')
  logout(@Res({ passthrough: true }) response): void {
    response.clearCookie('accessToken', {
      signed: true,
      httpOnly: true,
      path: '/api',
    });
    response.clearCookie('refreshToken', {
      signed: true,
      httpOnly: true,
      path: '/api/auth/refresh',
    });
  }
}
