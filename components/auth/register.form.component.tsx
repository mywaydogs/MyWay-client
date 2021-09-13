import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Router from "next/router";
import Alert from "../utils/alert.component";
import Spinner from "../utils/spinner.component";

const RegisterSchema = Yup.object().shape({
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
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        axios
          .post("/api/auth/register", values)
          .then((res) => {
            setStatus({ message: "You have registered successfully." });
            setTimeout(() => Router.push("/"), 2000);
          })
          .catch((e) => {
            setStatus({ error: e.response.data.message });
          })
          .finally(() => setSubmitting(false));
      }}
      validationSchema={RegisterSchema}
    >
      {({ isSubmitting, status }) => (
        <Form className="flex w-96 justify-center items-center flex-wrap">
          <Field
            name="firstName"
            type="text"
            placeholder="First Name"
            className="my-2 w-full"
          />
          <ErrorMessage name="firstName" />

          <Field
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="my-2 w-full"
          />
          <ErrorMessage name="lastName" />

          <Field
            name="email"
            type="email"
            placeholder="Email"
            className="my-2 w-full"
          />
          <ErrorMessage name="email" />

          <Field
            name="password"
            type="password"
            placeholder="Password"
            className="my-2 w-full"
          />
          <ErrorMessage name="password" />

          {status?.error && <Alert type="error" message={status?.error} />}

          {status?.message && (
            <Alert type="success" message={status?.message} />
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            {!isSubmitting && "Submit"}
            {isSubmitting && <Spinner />}
          </button>
        </Form>
      )}
    </Formik>
  );
}
