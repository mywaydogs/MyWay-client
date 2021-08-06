import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateDogDto } from './dto/create-dog.dto';
import { FindAllQueryDto } from './dto/find-all.query.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog) private readonly dogsRepository: Repository<Dog>,
  ) {}

  async create(createDogDto: CreateDogDto): Promise<void> {
    await this.dogsRepository.insert({
      ...createDogDto,
      age_last_updated: new Date(),
    });
  }

  async findAll(userId: number, findAllQueryDto: FindAllQueryDto) {
    // return await this.dogsRepository.find(findAllQueryDto);
    return await getConnection()
      .createQueryBuilder(Dog, 'dog')
      .innerJoinAndSelect(
        'dog.customer',
        'customer',
        'customer.userId = :userId',
        { userId },
      )
      .getMany();
  }

  async findOne(id: number): Promise<Dog> {
    return await this.dogsRepository.findOne(id);
  }

  update(id: number, updateDogDto: UpdateDogDto) {
    return `This action updates a #${id} dog`;
  }

  remove(id: number) {
    return `This action removes a #${id} dog`;
  }
}
