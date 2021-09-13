import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function AddTrainingGoalTaskForm({
  dogId,
  goalId,
}: {
  dogId: number;
  goalId: number;
}) {
  return (
    <Formik
      initialValues={{ description: "" }}
      onSubmit={(values, actions) => {
        axios.post(`/api/dogs/${dogId}/training-goals/${goalId}/tasks`, {
          ...values,
        });
      }}
    >
      <Form>
        <Field name="description" placeholder="description" />
        <ErrorMessage name="description" />

        <button type="submit">Add Task</button>
      </Form>
    </Formik>
  );
}
