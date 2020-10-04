import React from "react";
import Modal from "../utils/Modal";
import TextInput from "../utils/TextInput";
import DateInput from "../utils/DateInput";
import update from "immutability-helper";
import Button from "../utils/Button";
import { confirmAlert } from "react-confirm-alert";

const taskInitialState = {
  title: "",
  completed: false,
  startTime: "",
  endTime: "",
};

function GoalModal({ data, title, onChange, onSubmit }) {
  const goal = data.goal;

  const handleAddTask = () => {
    onChange(update(data, { goal: { tasks: { $push: [taskInitialState] } } }));
  };

  const handleTaskInputChange = (e, taskIdx) => {
    const value =
      e.target.name === "completed" ? e.target.checked : e.target.value;
    onChange(
      update(data, {
        goal: {
          tasks: { [taskIdx]: { [e.target.name]: { $set: value } } },
        },
      })
    );
  };

  const handleGoalInputChange = (e) => {
    onChange(
      update(data, { goal: { [e.target.name]: { $set: e.target.value } } })
    );
  };

  const onRequestClose = () => {
    onChange(update(data, { isOpen: { $set: false } }));
  };

  const handleDeleteTask = (taskIdx) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <>
          <h2>מחיקת מטרה</h2>
          <p>
            האם אתה בטוח שברצונך להסיר את המשימה מהרשימה? פעולה זו אינה סופית
            ועל מנת לשמור את השינויים יש להגיש את הטופס על ידי לחיצה על הכפתור "
            {title}"
          </p>
          <Button
            value="כן"
            onClick={() => {
              onChange(
                update(data, { goal: { tasks: { $splice: [[taskIdx, 1]] } } })
              );
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
    <Modal isOpen={data.isOpen} onRequestClose={onRequestClose}>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        <TextInput
          label="כותרת"
          name="title"
          value={goal.title}
          onChange={handleGoalInputChange}
        />
        <TextInput
          label="תיאור"
          name="description"
          value={goal.description}
          onChange={handleGoalInputChange}
        />
        <h2>משימות</h2>
        <div style={{ display: "table" }}>
          {goal.tasks?.length !== 0 && (
            <div style={{ display: "table-header-group" }}>
              <div style={{ display: "table-cell", paddingLeft: "10px" }}>
                הושלמה
              </div>
              <div style={{ display: "table-cell" }}>כותרת</div>
              <div style={{ display: "table-cell" }}>תאריך התחלה</div>
              <div style={{ display: "table-cell" }}>תאריך סיום</div>
            </div>
          )}
          {goal.tasks?.map((task, i) => (
            <div key={i} style={{ display: "table-row" }}>
              <div style={{ display: "table-cell" }}>
                <input
                  type="checkbox"
                  name="completed"
                  checked={task.completed}
                  onChange={(e) => handleTaskInputChange(e, i)}
                />
              </div>
              <div style={{ display: "table-cell" }}>
                <TextInput
                  name="title"
                  value={task.title}
                  onChange={(e) => handleTaskInputChange(e, i)}
                />
              </div>
              <div style={{ display: "table-cell" }}>
                <DateInput
                  type="date"
                  name="startTime"
                  value={new Date(task.startTime)}
                  onChange={(e) => handleTaskInputChange(e, i)}
                />
              </div>
              <div style={{ display: "table-cell" }}>
                <DateInput
                  type="date"
                  name="endTime"
                  value={new Date(task.endTime)}
                  onChange={(e) => handleTaskInputChange(e, i)}
                />
              </div>
              <div style={{ display: "table-cell" }}>
                <Button
                  type="button"
                  value="מחיקה"
                  onClick={() => handleDeleteTask(i)}
                />
              </div>
            </div>
          ))}
        </div>
        {goal.tasks[goal.tasks.length - 1] !== taskInitialState && (
          <Button
            type="button"
            value="צור משימה חדשה"
            onClick={handleAddTask}
          />
        )}
        <Button type="submit" value={title} />
      </form>
    </Modal>
  );
}

export default GoalModal;
