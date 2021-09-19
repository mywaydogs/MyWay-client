import { APICreateResult } from "../dto/api/api-create-result";
import { CreateCustomerDto } from "../dto/customers/create-customer.dto";
import { CustomerDto } from "../dto/customers/customer.dto";
import BaseHttpService from "./base-http.service";

export default class CustomersService extends BaseHttpService {
  async findAll(): Promise<CustomerDto[]> {
    return (await this.get<CustomerDto[]>("/api/customers")) as CustomerDto[];
  }

  async findOne(id: number): Promise<CustomerDto> {
    return (await this.get<CustomerDto>(`/api/customers/${id}`)) as CustomerDto;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<APICreateResult> {
    return (await this.post<APICreateResult>(
      "/api/customers",
      createCustomerDto
    )) as APICreateResult;
  }
}
