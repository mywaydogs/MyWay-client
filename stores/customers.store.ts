import { RootStore } from ".";
import { APICreateResult } from "../dto/api/api-create-result";
import { CreateCustomerDto } from "../dto/customers/create-customer.dto";
import { CustomerDto } from "../dto/customers/customer.dto";
import CustomersService from "../services/customers.service";

export default class CustomersStore {
  constructor(
    private readonly rootStore: RootStore,
    private readonly customersService: CustomersService
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<APICreateResult> {
    return await this.customersService.create(createCustomerDto);
  }

  async findAll(): Promise<CustomerDto[]> {
    return await this.customersService.findAll();
  }

  async findOne(id: number): Promise<CustomerDto> {
    return await this.customersService.findOne(id);
  }
}
