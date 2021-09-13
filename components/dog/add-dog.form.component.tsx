import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useUser } from "../../services/auth.service";

interface AddDogFormProps {
  customerId: number;
}

export default function AddDogForm(props: AddDogFormProps) {
  const user = useUser();

  return (
    <Formik
      initialValues={{
        name: "",
        age_years: "",
        age_months: "",
        breed: "",
        color: "",
      }}
      onSubmit={async (values, actions) => {
        axios
          .post("/api/dogs", { ...values, customerId: props.customerId })
          .then((res) =>
            actions.setStatus({
              status: true,
              message: "Dog was created successfully.",
            })
          )
          .catch((e) => actions.setStatus({ status: true, message: e.message }))
          .finally(() => actions.setSubmitting(false));
      }}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <Field name="name" placeholder="Name" />
          <ErrorMessage name="name" />

          <Field name="age_years" placeholder="Age (Years)" />
          <ErrorMessage name="age_years" />

          <Field name="age_months" placeholder="Age (Months)" />
          <ErrorMessage name="age_months" />

          <Field name="color" placeholder="Color" />
          <ErrorMessage name="color" />

          <Field name="breed" placeholder="Breed" />
          <ErrorMessage name="breed" />

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
