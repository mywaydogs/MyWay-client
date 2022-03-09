import { useCallback, useEffect, useRef } from "react";
import { TrainingGoalDto } from "../../dto/training-goal.dto";
import * as d3 from "d3";
import { TrainingGoalTaskDto } from "../../dto/training-goal-task.dto";
import NoGoalsMarkedMessage from "./no-goals-marked-message.component";
import TrainingsChartGoalRow from "./trainings-chart-goal-row.component";
import { ChartGoalDto } from "../../dto/trainings-chart/trainings-chart-goal.dto";
import { reduce } from "lodash";

export default function TrainingsChart({
  trainingGoals,
}: {
  trainingGoals: TrainingGoalDto[];
}) {
  const ref = useRef<SVGSVGElement>(null);

  // const colorGoals = (goals: ChartGoalDto[]) => {
  //   const colorGen = colorsGenerator();
  //   return goals
  //     .filter((goal) => goal.showOnChart)
  //     .filter((goal) => goal.tasks.length !== 0)
  //     .map((goal) => ({
  //       ...goal,
  //       color: colorGen.next().value,
  //     }));
  // };

  const filterShownGoals = (goals: ChartGoalDto[]) => {
    return goals.filter((goal) => goal.showOnChart);
  };

  const isAnyGoalShown = (goals: ChartGoalDto[]) => {
    return goals.some((goal) => goal.showOnChart);
  };

  const findMaxEndingTrainingInGoals = (goals: ChartGoalDto[]): number => {
    return Math.max(
      ...goals.map((goal: ChartGoalDto) =>
        findMaxEndingTrainingInTasks(goal.tasks)
      )
    );
  };

  const findMaxEndingTrainingInTasks = (
    tasks: TrainingGoalTaskDto[]
  ): number => {
    return Math.max(
      ...tasks.map((task: TrainingGoalTaskDto) => task.endingTraining)
    );
  };

  const calcTotalNumberOfTasks = (goals: ChartGoalDto[]): number => {
    return goals.reduce(
      (acc: number, e: ChartGoalDto) => acc + e.tasks.length,
      0
    );
  };

  let goals: ChartGoalDto[] = [];
  let tasksSoFar = 0;

  for (const trainingGoal of trainingGoals) {
    goals.push({
      ...trainingGoal,
      color: "#000",
      showOnChart: true,
      tasksSoFar,
    });
    tasksSoFar += trainingGoal.tasks.length;
  }

  let chartGoals = filterShownGoals(goals);
  const maxEndingTrainingInGoals = findMaxEndingTrainingInGoals(chartGoals);

  const totalNumberOfTasks = calcTotalNumberOfTasks(chartGoals);

  const draw = useCallback(
    (ref) => {
      d3.select("#x-axis").remove();

      const svgClientSize = d3
        .select(ref.current)
        .node()
        .getBoundingClientRect();

      const xScale = d3
        .scaleLinear()
        .domain([1, maxEndingTrainingInGoals])
        .range([svgClientSize.width * 0.85, 0]);

      const xAxis = d3
        .axisBottom(xScale)
        .tickValues(
          Array.from({ length: maxEndingTrainingInGoals }, (v, k) => k + 1)
        )
        .tickFormat(d3.format("d"));

      d3.select(ref.current)
        .append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${svgClientSize.height * 0.9})`)
        .call(xAxis);
    },
    [ref]
  );

  useEffect(() => {
    window.addEventListener("resize", () => draw(ref));

    draw(ref);

    return () => {
      window.removeEventListener("resize", () => draw(ref));
    };
  }, [ref]);

  return (
    <svg
      ref={ref}
      style={{ border: "1px solid black" }}
      width="100%"
      height="100%"
    >
      {isAnyGoalShown(chartGoals) == false && <NoGoalsMarkedMessage />}
      <svg>
        {chartGoals.map((goal, idx) => (
          <TrainingsChartGoalRow
            key={goal.id}
            idx={idx}
            total={chartGoals.length}
            goal={goal}
            maxEndingTraining={maxEndingTrainingInGoals}
            totalNumberOfTasks={totalNumberOfTasks}
          />
        ))}
      </svg>
    </svg>
  );
}
