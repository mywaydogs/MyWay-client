import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useUser } from "../services/auth.service";

export default function Profile() {
  const { user } = useUser();

  if (!user) {
    return <>Loading...</>;
  }

  return (
    <>
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }}
        onSubmit={(values, actions) => {
          axios.patch(`/api/users/${user.id}`, { ...values });
        }}
      >
        <Form>
          <Field name="firstName" placeholder="First Name" />
          <ErrorMessage name="firstName" />

          <Field name="lastName" placeholder="Last Name" />
          <ErrorMessage name="lastName" />

          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <button type="submit">Save Changes</button>
        </Form>
      </Formik>

      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values, actions) => {
          axios.patch(`/api/users/${user.id}`, { password: values.password });
        }}
      >
        <Form>
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" />

          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <ErrorMessage name="confirmPassword" />

          <button type="submit">Change Password</button>
        </Form>
      </Formik>

      <Formik
        initialValues={{ aboutMe: user.aboutMe }}
        onSubmit={(values, actions) => {
          axios.patch(`/api/users/${user.id}`, { aboutMe: values.aboutMe });
        }}
      >
        <Form>
          <Field name="aboutMe" placeholder="About me" as="textarea" />
          <ErrorMessage name="aboutMe" />

          <button type="submit">Save Changes</button>
        </Form>
      </Formik>
    </>
  );
}
