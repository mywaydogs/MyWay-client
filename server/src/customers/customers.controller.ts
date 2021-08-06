import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindAllQueryDto } from './dto/find-all.query.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // @Get(':userId')
  // async getCustomersOfUserById(
  //   @Param('userId') userId: number,
  // ): Promise<Customer[]> {
  //   return await this.customersService.getCustomersOfUserById(userId);
  // }

  @Get('')
  async findAll(@Query() findAllQueryDto: FindAllQueryDto) {
    return this.customersService.findAll(findAllQueryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }

  @Post('')
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<void> {
    return await this.customersService.createCustomer(createCustomerDto);
  }
}
