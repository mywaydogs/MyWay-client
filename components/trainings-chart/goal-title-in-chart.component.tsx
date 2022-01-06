import { ChartGoalDto } from "../../dto/trainings-chart/trainings-chart-goal.dto";

export default function GoalTitleInChart({ goal }: { goal: ChartGoalDto }) {
  return (
    <text textAnchor="middle" y="50%" x="50%" color="black">
      {goal.title}
    </text>
  );
}
