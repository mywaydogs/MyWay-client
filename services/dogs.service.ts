import { DogDto } from "../dto/dogs/dog.dto";
import { FindAllDogsDto } from "../dto/dogs/find-all-dogs.dto";
import BaseHttpService from "./base-http.service";
import queryString from "query-string";

export default class DogsService extends BaseHttpService {
  async findAll(findAllDogsDto: FindAllDogsDto): Promise<DogDto[]> {
    const queryStr = queryString.stringify(findAllDogsDto);
    return (await this.get<DogDto[]>(
      `/api/dogs${queryStr ? `?${queryStr}` : ""}`
    )) as DogDto[];
  }

  async findOne(id: number): Promise<DogDto> {
    return (await this.get<DogDto>(`/api/dogs/${id}`)) as DogDto;
  }
}
