import { TrainerDto } from "../dto/trainer.dto";
import BaseHttpService from "./base-http.service";

export default class TrainersService extends BaseHttpService {
  async findAll(): Promise<TrainerDto[]> {
    return (await this.get<TrainerDto[]>("/api/trainers")) as TrainerDto[];
  }
}
