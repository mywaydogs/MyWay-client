import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function AddTrainingGoalForm({ dogId }: { dogId: number }) {
  return (
    <Formik
      initialValues={{ title: "" }}
      onSubmit={(values, actions) => {
        axios.post(`/api/dogs/${dogId}/training-goals`, { ...values });
      }}
    >
      <Form>
        <Field name="title" placeholder="Title" />
        <ErrorMessage name="title" />

        <button type="submit">Add New Goal</button>
      </Form>
    </Formik>
  );
}
