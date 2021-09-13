import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useUser } from "../../services/auth.service";

export default function AddCustomerForm() {
  const { user } = useUser();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: "",
      }}
      onSubmit={async (values, actions) => {
        axios
          .post("/api/customers", { ...values, userId: user.id })
          .then((res) =>
            actions.setStatus("Customer was created successfully.")
          )
          .catch((e) => actions.setStatus(e.message))
          .finally(() => actions.setSubmitting(false));
      }}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <Field name="firstName" type="text" placeholder="First Name" />
          <ErrorMessage name="firstName" />

          <Field name="lastName" type="text" placeholder="Last Name" />
          <ErrorMessage name="lastName" />

          <Field name="email" placeholder="Email" type="email" />
          <ErrorMessage name="email" />

          <Field name="address" type="text" placeholder="Address" />
          <ErrorMessage name="address" />

          <Field name="phone" type="text" placeholder="Phone Number" />
          <ErrorMessage name="phone" />

          {!isSubmitting ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            >
              Submit
            </button>
          ) : (
            <>submitting...</>
          )}

          {status && status}
        </Form>
      )}
    </Formik>
  );
}
