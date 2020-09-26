import React, { useState } from "react";
import FullCalendar, { flexibleCompare } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import heLocale from "@fullcalendar/core/locales/he";

function Calendar({ goals }) {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        headerToolbar={{ center: "dayGridMonth,listWeek" }}
        initialView="dayGridMonth"
        locale={heLocale}
        defaultAllDay={true}
        handleWindowResize={true}
        events={goals
          .filter((goal) => goal.showOnCalendar)
          .map((goal) => ({
            title: goal.title,
            start: goal.startTime,
            end: goal.endTime,
          }))}
      />
    </>
  );
}

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

function WorkPlan({ goals }) {
  const [chosenGoal, setChosenGoal] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "40vw" }}>
        <Calendar goals={goals} />
      </div>
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
            <li
              key={`${idx}`}
              style={{ margin: "10px auto", border: "1px solid black" }}
              onMouseDownCapture={() => setChosenGoal(goal)}
            >
              <input
                type="checkbox"
                checked={goal.showOnCalendar}
                onChange={() => {}}
              />
              <label>{goal.title}</label>
            </li>
          ))}
        </ul>
      </div>
      <GoalView goal={chosenGoal} />
    </div>
  );
}

export default WorkPlan;
