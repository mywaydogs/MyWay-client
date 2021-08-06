import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useUser } from "../services/auth-service";

export default function AddCustomerForm() {
  const user = useUser();

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
            actions.setStatus({
              status: true,
              message: "Customer was created successfully.",
            })
          )
          .catch((e) => actions.setStatus({ status: true, message: e.message }))
          .finally(() => actions.setSubmitting(false));
      }}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <Field name="firstName" placeholder="First Name" />
          <ErrorMessage name="firstName" />

          <Field name="lastName" placeholder="Last Name" />
          <ErrorMessage name="lastName" />

          <Field name="email" placeholder="Email" type="email" />
          <ErrorMessage name="email" />

          <Field name="address" placeholder="Address" />
          <ErrorMessage name="address" />

          <Field name="phone" placeholder="Phone Number" />
          <ErrorMessage name="phone" />

          {!isSubmitting ? (
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          ) : (
            <>submitting...</>
          )}

          {status && <>{status.message}</>}
        </Form>
      )}
    </Formik>
  );
}
