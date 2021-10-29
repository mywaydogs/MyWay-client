import axios from "axios";
import { Form, Formik } from "formik";
import ErrorMessage from "../utils/forms/error-message.component";
import FormField from "../utils/forms/form-field.component";
import FormLabel from "../utils/forms/form-label.component";
import StatusMessage from "../utils/forms/status-message.component";
import SubmitButton from "../utils/forms/submit-button.component";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores";
import { APICreateResult } from "../../dto/api/api-create-result";
import { APIErrorResponse } from "../../dto/api/api-error-response";

const addCustomerSchema = Yup.object().shape({
  firstName: Yup.string().required("שדה השם הפרטי הינו חובה."),
  lastName: Yup.string().required("שדה שם המשפחה הינו חובה."),
  email: Yup.string()
    .email("כתובת הדוא״ל שהוזנה אינה תקינה.")
    .required("שדה כתובת הדוא״ל הינו חובה."),
  address: Yup.string(),
  phone: Yup.string()
    .matches(/^\d+$/, "מספר הפלאפון חייב להכיל אך ורק ספרות.")
    .length(10, "מספר הפלאפון חייב להיות באורך של 10 תווים בדיוק."),
});

const AddCustomerForm = observer(function AddCustomerForm({
  onCustomerAdded,
}: {
  onCustomerAdded: Function;
}) {
  const { customersStore } = useStores();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: "",
      }}
      onSubmit={async (values, { setStatus, setSubmitting }) => {
        customersStore
          .create(values)
          .then((res: APICreateResult) => {
            setStatus({ message: "הלקוח נוסף בהצלחה." });
            onCustomerAdded(res.id);
          })
          .catch((e: APIErrorResponse) => setStatus({ error: e.message }))
          .finally(() => setSubmitting(false));
      }}
      validationSchema={addCustomerSchema}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <FormLabel htmlFor="firstName" value="שם פרטי" />
          <FormField name="firstName" type="text" placeholder="ישראל" />
          <ErrorMessage name="firstName" />

          <FormLabel htmlFor="lastName" value="שם משפחה" />
          <FormField name="lastName" type="text" placeholder="ישראלי" />
          <ErrorMessage name="lastName" />

          <FormLabel htmlFor="email" value="כתובת דוא״ל" />
          <FormField
            name="email"
            placeholder="example@gmail.com"
            type="email"
          />
          <ErrorMessage name="email" />

          <FormLabel htmlFor="address" value="כתובת" />
          <FormField name="address" type="text" placeholder="כתובת" />
          <ErrorMessage name="address" />

          <FormLabel htmlFor="phone" value="מספר פלאפון" />
          <FormField name="phone" type="text" placeholder="052-123-1234" />
          <ErrorMessage name="phone" />

          <StatusMessage formStatus={status} />

          <SubmitButton isSubmitting={isSubmitting} value="הוספת לקוח" />
        </Form>
      )}
    </Formik>
  );
});

export default AddCustomerForm;
