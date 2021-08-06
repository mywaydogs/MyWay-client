import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Router from "next/router";

const LoginSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

export default function RegisterForm() {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        axios
          .post("/api/auth/register", values)
          .then((res) => {
            setSubmitting(false);
          })
          .catch((e) => {
            setSubmitting(false);
          });
      }}
      validationSchema={LoginSchema}
    >
      <Form>
        <Field name="firstName" type="text" placeholder="First Name" />
        <ErrorMessage name="firstName" />

        <Field name="lastName" type="text" placeholder="Last Name" />
        <ErrorMessage name="lastName" />

        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" />

        <Field name="password" type="password" placeholder="Password" />
        <ErrorMessage name="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
