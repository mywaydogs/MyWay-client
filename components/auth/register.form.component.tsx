import { Field, Form, Formik } from "formik";
import Router from "next/router";
import * as Yup from "yup";
import { APIErrorResponse } from "../../dto/api/api-error-response";
import { useStores } from "../../stores";
import Alert from "../utils/alert.component";
import ErrorMessage from "../utils/forms/error-message.component";
import Spinner from "../utils/spinner.component";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string()
    .email("The email address provided in invalid.")
    .required("An email address is required."),
  password: Yup.string()
    .min(8, "A password must be at least 8 characters.")
    .required("A password is required."),
});

export default function RegisterForm() {
  const { userStore } = useStores();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        userStore
          .register(values)
          .then(() => {
            setStatus({
              message: "You have registered successfully. Logging in ...",
            });
            setTimeout(() => Router.push("/"), 2000);
          })
          .catch((e: APIErrorResponse) => {
            setStatus({ error: e.message });
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
