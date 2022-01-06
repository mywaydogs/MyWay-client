import { TrainingGoalDto } from "../training-goal.dto";

export interface ChartGoalDto extends TrainingGoalDto {
  showOnChart: boolean;
  color: string;
  tasksSoFar: number;
}
