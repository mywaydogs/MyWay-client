import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from 'src/config/config';
import { UsersModule } from 'src/users/users.module';
import { JwtAccessStrategy } from './jwt-access.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: config.access_token_secret,
      signOptions: { expiresIn: config.access_token_expires },
    }),
    UsersModule,
  ],
  providers: [
    JwtAccessStrategy,
    { provide: 'JwtAccessService', useExisting: JwtService },
  ],
  exports: ['JwtAccessService'],
})
export class JwtAccessModule {}
