import { RootStore } from ".";
import { TrainerDto } from "../dto/trainer.dto";
import TrainersService from "../services/trainers.service";

export default class TrainersStore {
  constructor(
    private readonly rootStore: RootStore,
    private readonly trainersService: TrainersService
  ) {}

  async findAll(): Promise<TrainerDto[]> {
    return await this.trainersService.findAll();
  }

  async findOne(id: number): Promise<TrainerDto> {
    return await this.trainersService.findOne(id);
  }
}
