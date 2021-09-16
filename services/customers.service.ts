import { CustomerDto } from "../dto/customer.dto";
import BaseHttpService from "./base-http.service";

export default class CustomersService extends BaseHttpService {
  async findAll(): Promise<CustomerDto[]> {
    return (await this.get<CustomerDto[]>("/api/customers")) as CustomerDto[];
  }

  async findOne(id: number): Promise<CustomerDto> {
    return (await this.get<CustomerDto>(`/api/customers/${id}`)) as CustomerDto;
  }
}
