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
  firstName: Yup.string().required("First Name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string()
    .email("The email address provided is invalid.")
    .required("Email address is required."),
  address: Yup.string(),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only digits")
    .length(10, "Phone number must be exactly 10 digits"),
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
            setStatus({ message: "Customer was created successfully." });
            onCustomerAdded(res.id);
          })
          .catch((e: APIErrorResponse) => setStatus({ error: e.message }))
          .finally(() => setSubmitting(false));
      }}
      validationSchema={addCustomerSchema}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <FormLabel htmlFor="firstName" value="First Name" />
          <FormField name="firstName" type="text" placeholder="First Name" />
          <ErrorMessage name="firstName" />

          <FormLabel htmlFor="lastName" value="Last Name" />
          <FormField name="lastName" type="text" placeholder="Last Name" />
          <ErrorMessage name="lastName" />

          <FormLabel htmlFor="email" value="Email Address" />
          <FormField name="email" placeholder="Email" type="email" />
          <ErrorMessage name="email" />

          <FormLabel htmlFor="address" value="Address" />
          <FormField name="address" type="text" placeholder="Address" />
          <ErrorMessage name="address" />

          <FormLabel htmlFor="phone" value="Phone Number" />
          <FormField name="phone" type="text" placeholder="Phone Number" />
          <ErrorMessage name="phone" />

          <StatusMessage formStatus={status} />

          <SubmitButton isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
});

export default AddCustomerForm;
