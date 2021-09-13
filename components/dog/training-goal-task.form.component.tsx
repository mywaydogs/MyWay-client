import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useSWR from "swr";
import { TrainingGoalTaskDto } from "../../dto/training-goal-task.dto";
import { convertDateForDatePicker } from "../../services/time.service";

export default function TrainingGoalTaskForm({
  dogId,
  goalId,
  taskId,
}: {
  dogId: number;
  goalId: number;
  taskId: number;
}) {
  const { data: taskData, error: taskError } = useSWR(
    dogId && goalId && taskId
      ? `/api/dogs/${dogId}/training-goals/${goalId}/tasks/${taskId}`
      : null
  );

  const task: TrainingGoalTaskDto = taskData?.data;

  if (!task) {
    return <>Loading...</>;
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
