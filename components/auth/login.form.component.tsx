import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { APIErrorResponse } from "../../dto/api/api-error-response";
import { useStores } from "../../stores";
import ErrorMessage from "../utils/forms/error-message.component";
import FormField from "../utils/forms/form-field.component";
import StatusMessage from "../utils/forms/status-message.component";
import SubmitButton from "../utils/forms/submit-button.component";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("כתובת הדוא״ל שהוזנה אינה תקינה.")
    .required("שדה כתובת הדוא״ל הינו חובה."),
  password: Yup.string()
    .min(8, "הסיסמה חייבת להכיל לפחות 8 תווים.")
    .required("שדה הסיסמה הינו חובה."),
});

const LoginForm = observer(function LoginForm() {
  const router = useRouter();
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
            setStatus({ message: "ההתחברות עברה בהצלחה." });
            setTimeout(() => router.push("/"), 2000);
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
          <FormField name="email" type="email" placeholder="כתובת דוא״ל" />
          <ErrorMessage name="email" />

          <FormField name="password" type="password" placeholder="סיסמה" />
          <ErrorMessage name="password" />

          <StatusMessage formStatus={status} />
          <SubmitButton isSubmitting={isSubmitting} value="התחברות" />
        </Form>
      )}
    </Formik>
  );
});

export default LoginForm;
