import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { config } from 'src/config/config';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: config.refresh_token_secret,
      signOptions: { expiresIn: config.refresh_token_expires },
    }),
    forwardRef(() => AuthModule),
  ],
  providers: [
    JwtRefreshStrategy,
    { provide: 'JwtRefreshService', useExisting: JwtService },
  ],
  exports: ['JwtRefreshService'],
})
export class JwtRefreshModule {}
