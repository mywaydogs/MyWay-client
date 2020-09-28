import React, { useEffect, useState } from "react";
import FullCalendar, { flexibleCompare } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import heLocale from "@fullcalendar/core/locales/he";
import GoalsTimelineChart from "./GoalsTimelineChart";
import update from "immutability-helper";

function GoalView({ goal }) {
  if (!goal) {
    return <></>;
  }
  return (
    <div>
      <h2>פירוט מטרה - {goal.title}</h2>
      <h3>תיאור המטרה</h3>
      <p>{goal.description}</p>
      <h3>משימות</h3>
      <ul>
        {goal.tasks.map((task, idx) => (
          <li key={idx}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

function WorkPlan({ goals: data }) {
  const [chosenGoal, setChosenGoal] = useState(null);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    setGoals(data.map((goal) => ({ ...goal, showOnChart: true })));
  }, [data]);

  const toggleShowOnChart = (goal) => {
    setGoals(
      update(goals, {
        [goals.findIndex((g) => g._id === goal._id)]: {
          showOnChart: { $apply: (x) => !x },
        },
      })
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <h2>מטרות</h2>
        מיין לפי:
        <select>
          <option value="">זמן סיום</option>
          <option value="">בלהבלה</option>
          <option value="">ממלא מקום</option>
        </select>
        <ul style={{ listStyleType: "none" }}>
          {goals.map((goal, idx) => (
            <li key={`${idx}`}>
              <div>
                <input
                  type="checkbox"
                  checked={goal.showOnChart}
                  onChange={() => toggleShowOnChart(goal)}
                />
                <label>{goal.title}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ width: "60%" }}>
        <GoalsTimelineChart goals={goals.filter((goal) => goal.showOnChart)} />
      </div>
    </div>
  );
}

export default WorkPlan;
