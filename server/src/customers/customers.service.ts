import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindAllQueryDto } from './dto/find-all.query.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
  ) {}

  // async getCustomersOfUserById(userId: number): Promise<Customer[]> {
  //   return await this.customersRepository.find({ userId });
  // }

  async findAll(findAllQueryDto: FindAllQueryDto): Promise<Customer[]> {
    return await this.customersRepository.find(findAllQueryDto);
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customersRepository.findOne(id);
  }

  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<void> {
    await this.customersRepository.insert(createCustomerDto);
  }
}
