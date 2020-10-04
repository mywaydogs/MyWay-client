import React, { useEffect, useState } from "react";
import GoalsTimelineChart from "./GoalsTimelineChart";
import update from "immutability-helper";
import Button from "../utils/Button";

import GoalModal from "./GoalModal";
import { confirmAlert } from "react-confirm-alert";

const goalInitialState = {
  title: "",
  description: "",
  tasks: [],
};

function WorkPlan({ data, onSubmit }) {
  const [goals, setGoals] = useState([]);
  const [createModal, setCreateModal] = useState({
    goal: goalInitialState,
    isOpen: false,
  });
  const [editModal, setEditModal] = useState({
    goal: goalInitialState,
    isOpen: false,
  });

  useEffect(() => {
    setGoals(
      data.map((goal) => {
        let start = new Date(
          Math.min.apply(
            null,
            goal.tasks.map((task) => new Date(task.startTime))
          )
        );
        let end = new Date(
          Math.max.apply(
            null,
            goal.tasks.map((task) => new Date(task.endTime))
          )
        );
        return { ...goal, showOnChart: true, start, end };
      })
    );
  }, [data]);

  const toggleShowOnChart = (goalIdx) => {
    setGoals(
      update(goals, {
        [goalIdx]: {
          showOnChart: { $apply: (x) => !x },
        },
      })
    );
  };

  const onCreateModalChange = (val) => {
    setCreateModal(val);
  };

  const onCreateModalSubmit = (e) => {
    e.preventDefault();
    setCreateModal(update(createModal, { isOpen: { $set: false } }));
    onSubmit(update(goals, { $push: [createModal.goal] }));
  };

  const onEditModalChange = (val) => {
    setEditModal(val);
  };

  const onEditModalSubmit = (e) => {
    e.preventDefault();
    setEditModal(update(editModal, { isOpen: { $set: false } }));
    onSubmit(
      update(goals, {
        [goals.findIndex((goal) => goal._id === editModal.goal._id)]: {
          $set: editModal.goal,
        },
      })
    );
  };

  const showEditModal = (goal) => {
    setEditModal({
      goal,
      isOpen: true,
    });
  };

  const showCreateModal = () => {
    setCreateModal({
      goal: goalInitialState,
      isOpen: true,
    });
  };

  const handleDeleteGoal = (goalIdx) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <>
          <h2>מחיקת מטרה</h2>
          <p>
            האם אתה בטוח שברצונך למחוק את המטרה? פעולה זו הינה בלתי הפיכה, וכל
            הנתונים שלה יחד עם המשימות שלה יימחקו לצמיתות.
          </p>
          <Button
            value="כן"
            onClick={() => {
              onSubmit(update(goals, { $splice: [[goalIdx, 1]] }));
              onClose();
            }}
          />
          <Button
            value="לא"
            onClick={() => {
              onClose();
            }}
          />
        </>
      ),
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <h2>מטרות</h2>
        מיין לפי:
        <select>
          <option value="">זמן סיום</option>
          <option value="">זמן התחלה</option>
          <option value="">כותרת</option>
        </select>
        <ul style={{ listStyleType: "none", display: "table" }}>
          {goals.map((goal, idx) => (
            <li key={`${idx}`} style={{ display: "table-row" }}>
              <div style={{ display: "table-cell", paddingLeft: "20px" }}>
                <input
                  type="checkbox"
                  checked={goal.showOnChart}
                  onChange={() => toggleShowOnChart(idx)}
                />
                <label>{goal.title}</label>
              </div>
              <div style={{ display: "table-cell", paddingLeft: "20px" }}>
                {goal.start.toLocaleDateString("he-IL")}
              </div>
              <div style={{ display: "table-cell", paddingLeft: "20px" }}>
                {goal.end.toLocaleDateString("he-IL")}
              </div>
              <div style={{ display: "table-cell" }}>
                <Button value="עריכה" onClick={() => showEditModal(goal)} />
              </div>
              <div style={{ display: "table-cell" }}>
                <Button value="מחיקה" onClick={() => handleDeleteGoal(idx)} />
              </div>
            </li>
          ))}
        </ul>
        <Button value="יצירת מטרה חדשה" onClick={showCreateModal} />
      </div>
      <div style={{ width: "60%" }}>
        <GoalsTimelineChart goals={goals.filter((goal) => goal.showOnChart)} />
      </div>
      <GoalModal
        data={createModal}
        title="יצירת מטרה"
        onChange={onCreateModalChange}
        onSubmit={onCreateModalSubmit}
      />
      <GoalModal
        data={editModal}
        title="עריכת מטרה"
        onChange={onEditModalChange}
        onSubmit={onEditModalSubmit}
      />
    </div>
  );
}

export default WorkPlan;
