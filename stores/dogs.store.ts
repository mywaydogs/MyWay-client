import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { APICreateResult } from "../dto/api/api-create-result";
import { CreateDogDto } from "../dto/dogs/create-dog.dto";
import { DogDto } from "../dto/dogs/dog.dto";
import { FindAllDogsDto } from "../dto/dogs/find-all-dogs.dto";
import DogsService from "../services/dogs.service";

export default class DogsStore {
  constructor(
    private readonly rootStore: RootStore,
    private readonly dogsService: DogsService
  ) {
    makeAutoObservable(this);
  }

  async findAll(findAllDogsDto: FindAllDogsDto): Promise<DogDto[]> {
    return await this.dogsService.findAll(findAllDogsDto);
  }

  async findOne(id: number): Promise<DogDto> {
    return await this.dogsService.findOne(id);
  }

  async create(createDogDto: CreateDogDto): Promise<APICreateResult> {
    return await this.dogsService.create(createDogDto);
  }
}
