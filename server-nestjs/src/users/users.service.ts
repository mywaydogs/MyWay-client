import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import * as userSchema from './schemas/user.schema';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(userSchema.User.name)
    private userModel: Model<userSchema.UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<userSchema.User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<userSchema.User[]> {
    return this.userModel.find().exec();
  }

  async findOne(findOneUserDto: FindOneUserDto): Promise<User | undefined> {
    return this.userModel.findOne(findOneUserDto).lean();
  }
}
