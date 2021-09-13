import * as d3 from "d3";
import React, { useCallback, useEffect, useRef } from "react";
import { TrainingGoalDto } from "../../dto/training-goal.dto";
import { calculateDiffInWeeks } from "../../services/time.service";
const colorScheme = require("color-scheme");

function* colors(): Generator<string> {
  var scheme = new colorScheme();
  scheme
    .from_hue(21) // Start the scheme
    .scheme("triade") // Use the 'triade' scheme, that is, colors
    // selected from 3 points equidistant around
    // the color wheel.
    .variation("hard"); // Use the 'soft' color variation

  var colors = scheme.colors();
  for (let color of colors) {
    yield `#${color}`;
  }
}

interface TaskDto {
  description: string;
  startTime: Date;
  endTime: Date;
}

interface GoalDto {
  title: string;
  showOnChart: boolean;
  color: string;
  tasks: TaskDto[];
}

export default function DogTrainingGoalsTimelineChart({
  trainingGoals,
}: {
  trainingGoals: TrainingGoalDto[];
}) {
  const ref = useRef(null);

  const width = 800;
  const height = 400;

  const paddingX = width * 0.1;
  const paddingY = height * 0.1;

  useEffect(() => {
    d3.select(ref.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`);
  }, []);

  const goals: GoalDto[] = !trainingGoals
    ? []
    : trainingGoals.map((goal) => ({
        title: goal.title,
        showOnChart: true,
        color: "#000",
        tasks: goal.tasks.map((task) => ({
          description: task.description,
          startTime: new Date(task.startDate),
          endTime: new Date(task.endDate),
        })),
      }));

  const draw = useCallback(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const colorGen = colors();

    const coloredGoals: GoalDto[] = goals
      .filter((goal) => goal.showOnChart)
      .filter((goal) => goal.tasks.length !== 0)
      .map((goal) => ({
        ...goal,
        color: colorGen.next().value,
      }));

    const tasks = coloredGoals
      .map((goal) => goal.tasks.map((task) => ({ ...task, color: goal.color })))
      .reduce((acc, e) => acc.concat(e), []);

    if (coloredGoals.length === 0 || tasks.length === 0) {
      svg
        .append("text")
        .attr("transform", `translate(${width * 0.5}, ${height * 0.5})`)
        .text("לא סומנו מטרות");
      return;
    }

    const unfilteredTasks: TaskDto[] = goals.reduce(
      (acc, goal) => acc.concat(goal.tasks),
      [] as TaskDto[]
    );

    const minStartTime: Date =
      d3.min(unfilteredTasks.map((task) => new Date(task.startTime))) ||
      new Date();

    // The end time will be calculated according to the last task that shows up on the graph.
    const maxEndTime: Date =
      d3.max(tasks.map((task) => new Date(task.endTime))) || new Date();

    const startTime = new Date(
      minStartTime.getTime() //- minStartTime.getDay() * 1000 * 60 * 60 * 24
    );
    const endTime = new Date(
      minStartTime.getTime() +
        Math.ceil(calculateDiffInWeeks(maxEndTime, minStartTime)) *
          1000 *
          60 *
          60 *
          24 *
          7
    );

    const xScale = d3
      .scaleTime()
      .domain([startTime, endTime])
      .range([paddingX, width - paddingX]);

    const taskHeight = height / tasks.length / 2;
    const taskPadding = taskHeight / 4;

    const yScale = d3
      .scaleLinear()
      .domain([0, tasks.length - 1])
      .range([taskHeight + 2 * taskPadding, height - paddingY]);

    const nbWeeks = Math.ceil(calculateDiffInWeeks(endTime, startTime));

    let tickValues = [];
    for (let i = 0; i <= nbWeeks; i++) {
      tickValues.push(
        new Date(startTime.getTime() + i * 7 * 24 * 60 * 60 * 1000)
      );
    }

    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(tickValues)
      .tickFormat((val, i) => `${i + 1}`);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - paddingY})`)
      .call(xAxis);

    svg
      .append("text")
      .attr("transform", `translate(${width * 0.55}, ${height * 0.99})`)
      .text("Weeks");

    svg
      .selectAll("rect")
      .data(
        coloredGoals.reduce(
          (
            acc: {
              nbPrevTasks: number;
              goals: (GoalDto & { nbPrevTasks: number })[];
            },
            goal: GoalDto
          ): {
            nbPrevTasks: number;
            goals: (GoalDto & { nbPrevTasks: number })[];
          } => ({
            nbPrevTasks: acc.nbPrevTasks + goal.tasks.length,
            goals: acc.goals.concat([
              {
                ...goal,
                nbPrevTasks: acc.nbPrevTasks,
              },
            ]),
          }),
          { nbPrevTasks: 0, goals: [] as (GoalDto & { nbPrevTasks: number })[] }
        ).goals
      )
      .enter()
      .append("text")
      .attr(
        "transform",
        (goal) =>
          `translate(${paddingX * 0.1}, ${
            -3 * taskPadding -
            taskHeight +
            (yScale(goal.nbPrevTasks) +
              yScale(goal.nbPrevTasks + goal.tasks.length)) /
              2
          })`
      )
      // .attr("dy", "0.5rem")
      .style("font-size", "0.8rem")
      .text((goal) => goal.title);

    svg
      .selectAll("rect")
      .data(tasks)
      .enter()
      .append("rect")
      .attr(
        "width",
        (task) =>
          `${xScale(new Date(task.endTime)) - xScale(new Date(task.startTime))}`
      )
      .attr("height", `${taskHeight}`)
      .attr(
        "transform",
        (task, i) =>
          `translate(${xScale(new Date(task.startTime))}, ${
            yScale(i) - taskHeight - taskPadding
          })`
      )
      .style("fill", (task) => task.color);

    if (startTime <= new Date() && new Date() <= endTime) {
      svg
        .append("line")
        .attr("id", "today-cursor")
        .attr("x1", xScale(new Date()))
        .attr("x2", xScale(new Date()))
        .attr("y1", height - paddingY)
        .attr("y2", 0)
        .style("stroke-width", 2)
        .style("stroke", "#000");
    }

    // make the today-cursor dragable
    // svg.select("#today-cursor").call(
    //   d3.drag().on("drag", (e) => {
    //     if (xScale(startTime) <= e.x && e.x <= xScale(endTime)) {
    //       svg.select("#today-cursor").attr("x1", e.x).attr("x2", e.x);
    //     }
    //   })
    // );
  }, [goals, paddingX, paddingY]);

  useEffect(() => {
    draw();
  }, [goals, draw]);

  if (!trainingGoals) {
    return <>Loading...</>;
  }

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
}
