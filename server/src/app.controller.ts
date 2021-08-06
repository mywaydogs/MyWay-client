import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from './jwt-access/jwt-access.guard';
import { UserDec } from './users/user.decorator';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {}
