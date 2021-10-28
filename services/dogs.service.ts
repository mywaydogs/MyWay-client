import { DogDto } from "../dto/dogs/dog.dto";
import { FindAllDogsDto } from "../dto/dogs/find-all-dogs.dto";
import BaseHttpService from "./base-http.service";
import queryString from "query-string";
import { CreateDogDto } from "../dto/dogs/create-dog.dto";
import { APICreateResult } from "../dto/api/api-create-result";
import { TrainingGoalDto } from "../dto/training-goal.dto";
import { TrainingGoalTaskDto } from "../dto/training-goal-task.dto";

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

  async findOneTask(
    dogId: number,
    goalId: number,
    taskId: number
  ): Promise<TrainingGoalTaskDto> {
    return (await this.get(
      `/api/dogs/${dogId}/training-goals/${goalId}/tasks/${taskId}`
    )) as TrainingGoalTaskDto;
  }

  async findAllTrainingGoals(dogId: number): Promise<TrainingGoalDto[]> {
    return (await this.get<TrainingGoalDto[]>(
      `/api/dogs/${dogId}/training-goals`
    )) as TrainingGoalDto[];
  }

  async create(createDogDto: CreateDogDto): Promise<APICreateResult> {
    return (await this.post<APICreateResult>(
      "/api/dogs",
      createDogDto
    )) as APICreateResult;
  }
}
