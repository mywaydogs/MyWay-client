import { RootStore } from ".";
import { CustomerDto } from "../dto/customer.dto";
import CustomersService from "../services/customers.service";

export default class CustomersStore {
  constructor(
    private readonly rootStore: RootStore,
    private readonly customersService: CustomersService
  ) {}

  async findAll(): Promise<CustomerDto[]> {
    return await this.customersService.findAll();
  }

  async findOne(id: number): Promise<CustomerDto> {
      return await this.customersService.findOne(id);
  }
}
