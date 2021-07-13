import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { FindOneUserDto } from 'src/users/dto/find-one-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const findOneUserDto: FindOneUserDto = { username };
    const user = await this.usersService.findOne(findOneUserDto);
    console.log(user);
    if (user && user.password === pass) {
      // const { password, ...result } = user;
      const { username, id } = user;
      return { username, id };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
