import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/jwt-access/jwt-access.guard';
import { UserDec } from './user.decorator';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAccessGuard)
  @Get('profile')
  getUserProfile(@UserDec() user: User): User {
    return user;
  }
}
