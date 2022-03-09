import { TrainingGoalTaskDto } from "../../dto/training-goal-task.dto";
import { ChartGoalDto } from "../../dto/trainings-chart/trainings-chart-goal.dto";
import GoalTitleInChart from "./goal-title-in-chart.component";

export default function TrainingsChartGoalRow({
  idx,
  total,
  goal,
  maxEndingTraining,
  totalNumberOfTasks,
}: {
  idx: number;
  total: number;
  goal: ChartGoalDto;
  maxEndingTraining: number;
  totalNumberOfTasks: number;
}) {
  const TASKS_AREA_WIDTH = 85;

  const calcWidthOfTaskInPercentage = (task: TrainingGoalTaskDto) => {
    return (
      ((task.endingTraining - task.startingTraining) * TASKS_AREA_WIDTH) /
      maxEndingTraining
    );
  };

  const calcXOffsetOfTaskInPercentage = (task: TrainingGoalTaskDto): number => {
    const singleTrainingWidth = TASKS_AREA_WIDTH / maxEndingTraining;
    const taskWidth = calcWidthOfTaskInPercentage(task);
    return (
      TASKS_AREA_WIDTH -
      taskWidth -
      singleTrainingWidth * (task.startingTraining - 1)
    );
  };

  return (
    <>
      {/* Right-side goals headers */}
      <svg
        x={`${TASKS_AREA_WIDTH}%`}
        y={`${(90 / totalNumberOfTasks) * goal.tasksSoFar}%`}
        width="15%"
        height={`${(0.9 * 100 * goal.tasks.length) / totalNumberOfTasks}%`}
      >
        <GoalTitleInChart goal={goal} />
      </svg>
      {/* Area for drawing rectangles for goals tasks */}
      <svg>
        {goal.tasks.map((task, taskIdx) => (
          <svg
            key={task.id}
            x={`${calcXOffsetOfTaskInPercentage(task)}%`}
            y={`${(90 / totalNumberOfTasks) * (goal.tasksSoFar + taskIdx)}%`}
            width={`${calcWidthOfTaskInPercentage(task)}%`}
            height={`${90 / totalNumberOfTasks}%`}
          >
            <rect width="100%" height="100%" color="black" />
            <text x="50%" y="50%" textAnchor="middle" fill="white">
              {task.description}
            </text>
          </svg>
        ))}
      </svg>
    </>
  );
}
