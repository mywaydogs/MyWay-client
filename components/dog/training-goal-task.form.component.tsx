import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { TrainingGoalTaskDto } from "../../dto/training-goal-task.dto";
import { convertDateForDatePicker } from "../../libraries/time.library";
import { useStores } from "../../stores";
import Spinner from "../utils/spinner.component";

export default function TrainingGoalTaskForm({
  dogId,
  goalId,
  taskId,
}: {
  dogId: number;
  goalId: number;
  taskId: number;
}) {
  const [task, setTask] = useState<TrainingGoalTaskDto | null>(null);

  const { dogsStore } = useStores();

  useEffect(() => {
    dogsStore
      .findOneTask(dogId, goalId, taskId)
      .then((task: TrainingGoalTaskDto) => setTask(task));
  }, [dogId, goalId, taskId, dogsStore]);

  if (!task) {
    return <Spinner />;
  }
  return (
    <Formik
      initialValues={{
        description: task.description,
        startDate: convertDateForDatePicker(new Date(task.startDate)),
        endDate: convertDateForDatePicker(new Date(task.endDate)),
      }}
      onSubmit={(values, actions) => {
        axios.put(
          `/api/dogs/${dogId}/training-goals/${goalId}/tasks/${taskId}`,
          { ...values }
        );
      }}
    >
      <Form>
        <Field name="description" placeholder="description" />
        <ErrorMessage name="description" />

        <Field name="startDate" type="date" />
        <ErrorMessage name="startDate" />

        <Field name="endDate" type="date" />
        <ErrorMessage name="endDate" />

        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
}
