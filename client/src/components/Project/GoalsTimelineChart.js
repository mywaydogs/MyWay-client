import React, { useEffect, useRef } from "react";
import Loading from "../Loading";
import * as d3 from "d3";
import ColorScheme from "color-scheme";

function* colors() {
  var scheme = new ColorScheme();
  scheme
    .from_hue(21) // Start the scheme
    .scheme("triade") // Use the 'triade' scheme, that is, colors
    // selected from 3 points equidistant around
    // the color wheel.
    .variation("hard"); // Use the 'soft' color variation

  var colors = scheme.colors();
  for (let color of colors) {
    yield color;
  }
}

function GoalsTimelineChart({ goals }) {
  const ref = useRef();

  const width = 800;
  const height = 400;

  const paddingX = width * 0.1;
  const paddingY = height * 0.1;

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`);
  }, []);

  useEffect(() => {
    draw();
  }, [goals]);

  const draw = () => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const colorGen = colors();

    const coloredGoals = goals.map((goal) => ({
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

    const minStartTime = d3.min(
      tasks.map((task) => new Date(task.startTime)).concat(new Date())
    );
    const maxEndTime = d3.max(
      tasks.map((task) => new Date(task.endTime)).concat(new Date())
    );

    const startTime = new Date(
      minStartTime.getTime() - minStartTime.getDay() * 1000 * 60 * 60 * 24
    );
    const endTime = new Date(
      maxEndTime.getTime() + (7 - maxEndTime.getDay()) * 1000 * 60 * 60 * 24
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
      .range([height - paddingY, taskHeight + 2 * taskPadding]);

    const nbWeeks = Math.ceil(
      (endTime - startTime) / (1000 * 60 * 60 * 24 * 7)
    );

    const xAxis = d3
      .axisBottom()
      .scale(xScale)
      .ticks(nbWeeks)
      .tickFormat((val, i) => `${i + 1}`);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - paddingY})`)
      .call(xAxis);

    svg
      .append("text")
      .attr("transform", `translate(${width * 0.55}, ${height * 0.99})`)
      .text("שבועות");

    svg
      .selectAll("rect")
      .data(
        coloredGoals.reduce(
          (acc, goal) => ({
            nbPrevTasks: acc.nbPrevTasks + goal.tasks.length,
            goals: acc.goals.concat({ ...goal, nbPrevTasks: acc.nbPrevTasks }),
          }),
          { nbPrevTasks: 0, goals: [] }
        ).goals
      )
      .enter()
      .append("text")
      .attr(
        "transform",
        (goal) =>
          `translate(${0.09 * width}, ${
            (yScale(goal.nbPrevTasks) +
              yScale(goal.nbPrevTasks + goal.tasks.length)) /
            2
          })`
      )
      .attr("dy", "0.5rem")
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

    svg
      .append("line")
      .attr("id", "today-cursor")
      .attr("x1", xScale(new Date()))
      .attr("x2", xScale(new Date()))
      .attr("y1", 0)
      .attr("y2", yScale(0))
      .style("stroke-width", 2)
      .style("stroke", "#000");

    // make the today-cursor to be dragable
    // svg.select("#today-cursor").call(
    //   d3.drag().on("drag", (e) => {
    //     if (xScale(startTime) <= e.x && e.x <= xScale(endTime)) {
    //       svg.select("#today-cursor").attr("x1", e.x).attr("x2", e.x);
    //     }
    //   })
    // );
  };

  return <svg ref={ref}></svg>;
}

export default GoalsTimelineChart;
