import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import Router from "next/router";
import * as Yup from "yup";
import { APIErrorResponse } from "../../dto/api/api-error-response";
import { useStores } from "../../stores";
import ErrorMessage from "../utils/forms/error-message.component";
import FormField from "../utils/forms/form-field.component";
import StatusMessage from "../utils/forms/status-message.component";
import SubmitButton from "../utils/forms/submit-button.component";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("The email address provided is invalid.")
    .required("An email address is required."),
  password: Yup.string()
    .min(8, "A password must be at least 8 characters.")
    .required("A password is required."),
});

const LoginForm = observer(function LoginForm() {
  const { userStore } = useStores();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting, setStatus }) => {
        userStore
          .login(values)
          .then(() => {
            setStatus({ message: "You have logged in successfully." });
            setTimeout(() => Router.push("/"), 2000);
          })
          .catch((e: APIErrorResponse) => {
            setStatus({ error: e.message });
          })
          .finally(() => setSubmitting(false));
      }}
      validationSchema={LoginSchema}
    >
      {({ isSubmitting, status }) => (
        <Form className="flex justify-center items-center flex-wrap w-96">
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
});

export default LoginForm;
