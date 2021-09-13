import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Router from "next/router";
import Spinner from "../utils/spinner.component";
import Alert from "../utils/alert.component";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

export default function LoginForm() {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting, setStatus }) => {
        axios
          .post("/api/auth/login", values)
          .then((res) => {
            setStatus({ message: "You have logged in successfully." });
            setTimeout(() => Router.push("/"), 2000);
          })
          .catch((e) => {
            console.log(e.response);
            setStatus({ error: e.response.data.message });
          })
          .finally(() => setSubmitting(false));
      }}
      validationSchema={LoginSchema}
    >
      {({ isSubmitting, status }) => (
        <Form className="flex justify-center items-center flex-wrap w-96">
          <Field
            name="email"
            type="email"
            placeholder="Email"
            className="w-full my-2"
          />
          <ErrorMessage name="email" />

          <Field
            name="password"
            type="password"
            placeholder="Password"
            className="w-full my-2"
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
