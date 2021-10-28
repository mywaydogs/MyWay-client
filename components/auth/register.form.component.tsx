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
  name: Yup.string().required("שדה השם הינו חובה."),
  email: Yup.string()
    .email("כתובת הדוא״ל שהוזנה אינה תקינה.")
    .required("שדה כתובת הדוא״ל הינו חובה."),
  password: Yup.string()
    .min(8, "הסיסמה חייבת להכיל לפחות 8 תווים.")
    .required("שדה הסיסמה הינו חובה."),
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
              message: "ההרשמה עברה בהצלחה. מבצע התחברות ...",
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
          <FormField name="name" type="text" placeholder="ישראל ישראלי" />
          <ErrorMessage name="name" />

          <FormField name="email" type="email" placeholder="כתובת דוא״ל" />
          <ErrorMessage name="email" />

          <FormField name="password" type="password" placeholder="סיסמה" />
          <ErrorMessage name="password" />

          <StatusMessage formStatus={status} />

          <SubmitButton isSubmitting={isSubmitting} value="התרשמה" />
        </Form>
      )}
    </Formik>
  );
}
