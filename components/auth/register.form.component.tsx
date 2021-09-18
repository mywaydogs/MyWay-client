import { Form, Formik } from "formik";
import Router from "next/router";
import * as Yup from "yup";
import { APIErrorResponse } from "../../dto/api/api-error-response";
import { useStores } from "../../stores";
import ErrorMessage from "../utils/forms/error-message.component";
import FormField from "../utils/forms/form-field.component";
import StatusMessage from "../utils/forms/status-message.component";
import SubmitButton from "../utils/forms/submit-button.component";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
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
        name: "",
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
          <FormField name="name" type="text" placeholder="John Doe" />
          <ErrorMessage name="name" />

          <FormField name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" />

          <FormField name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" />

          <StatusMessage formStatus={status} />

          <SubmitButton isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}
