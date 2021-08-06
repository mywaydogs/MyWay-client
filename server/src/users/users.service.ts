import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindUserByIdDto } from './dto/find-user-by-id.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findUserById(findUserByIdDto: FindUserByIdDto): Promise<User> {
    return this.usersRepository.findOne(findUserByIdDto.id);
  }

  async findUserByEmail(findUserByEmailDto: FindUserByEmailDto): Promise<User> {
    return this.usersRepository.findOne({
      where: { email: findUserByEmailDto.email },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    try {
      await this.usersRepository.insert(createUserDto);
    } catch (e) {
      if (e.code == 23505) {
        throw new ForbiddenException('Email is already in use.');
      } else {
        throw new InternalServerErrorException('An unknown error has occurred');
      }
    }
  }
}
