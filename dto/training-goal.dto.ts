import { TrainingGoalTaskDto } from "./training-goal-task.dto";

export interface TrainingGoalDto {
    id: number;
    title: string;
    tasks: TrainingGoalTaskDto[];
}