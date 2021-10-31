import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import ErrorMessage from "../components/utils/forms/error-message.component";
import FormField from "../components/utils/forms/form-field.component";
import FormLabel from "../components/utils/forms/form-label.component";
import StatusMessage from "../components/utils/forms/status-message.component";
import SubmitButton from "../components/utils/forms/submit-button.component";
import Spinner from "../components/utils/spinner.component";
import { APIErrorResponse } from "../dto/api/api-error-response";
import { FileTooLargeError, readFileAsBase64 } from "../libraries/file.library";
import { useStores } from "../stores";
import Image from "next/image";

const userValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  email: Yup.string()
    .email("The email address provided is invalid.")
    .required("Email is required."),
  aboutMe: Yup.string(),
});

const accountValidationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required."),
  newPassword: Yup.string()
    .required("New password is required.")
    .min(8, "A password must be at least 8 characters."),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword")],
      "New Password field and Confirm Password fields must match."
    )
    .required("Confirm password is required.")
    .min(8, "A password must be at least 8 characters."),
});

const Profile = observer(function Profile() {
  const { userStore } = useStores();
  const { user } = userStore;

  if (user == null) {
    return <Spinner />;
  }

  const userInitialValues: {
    name: string;
    email: string;
    aboutMe: string;
  } = {
    name: user.name,
    email: user.email,
    aboutMe: user.aboutMe || "",
  };

  return (
    <>
      <h2 className="text-3xl">הגדרות עבור {user.name}</h2>

      <div className="bg-gray-300 rounded-lg p-5 my-5">
        <h3 className="text-2xl my-3">הגדרות משתמש</h3>
        <Formik
          initialValues={userInitialValues}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            userStore
              .update({ ...values, id: user.id })
              .then(() => {
                setStatus({ message: "הפרופיל שונה בהצלחה." });
              })
              .catch((e: APIErrorResponse) => setStatus({ error: e.message }))
              .finally(() => setSubmitting(false));
          }}
          validationSchema={userValidationSchema}
        >
          {({ isSubmitting, status, setStatus, setSubmitting }) => (
            <Form>
              <FormLabel htmlFor="name" value="שם מלא" />
              <FormField name="name" type="text" placeholder="ישראל ישראלי" />
              <ErrorMessage name="name" />

              <FormLabel htmlFor="email" value="כתובת דוא״ל" />
              <FormField
                name="email"
                type="email"
                placeholder="example@gmail.com"
              />
              <ErrorMessage name="email" />

              <FormLabel htmlFor="aboutMe" value="אודות" />
              <FormField
                name="aboutMe"
                type="text"
                placeholder="כמה משפטים על עצמי..."
                as="textarea"
              />
              <ErrorMessage name="aboutMe" />

              <FormLabel htmlFor="profileImage" value="תמונת פרופיל" />
              <div className="flex items-center my-3">
                {user.profileImage && (
                  <Image
                    src={user.profileImage}
                    width={70}
                    height={70}
                    alt={"Small round profile image of the user"}
                    className="rounded-full"
                  />
                )}
                <input
                  name="profileImage"
                  type="file"
                  onChange={async (e) => {
                    let profileImage: File | null | string =
                      e.currentTarget.files && e.currentTarget.files[0];

                    if (profileImage) {
                      try {
                        profileImage = await readFileAsBase64(
                          profileImage as File
                        );
                        setSubmitting(true);
                        userStore
                          .update({ profileImage, id: user.id })
                          .then(() => {
                            setStatus({
                              message:
                                "Your profile image was uploaded succesfully.",
                            });
                          })
                          .catch((e: APIErrorResponse) =>
                            setStatus({ error: e.message })
                          )
                          .finally(() => setSubmitting(false));
                      } catch (err) {
                        if (err instanceof FileTooLargeError) {
                          setStatus({ error: err.message });
                        } else {
                          setStatus({ error: "An unknown error has occured." });
                        }
                        e.target.value = "";
                        return;
                      }
                    }
                  }}
                />
              </div>
              <ErrorMessage name="profileImage" />

              <StatusMessage formStatus={status} />

              <SubmitButton isSubmitting={isSubmitting} value="שמירת שינויים" />
            </Form>
          )}
        </Formik>
      </div>
      <div className="bg-gray-300 rounded-lg p-5 my-5">
        <h3 className="text-2xl my-3">הגדרות חשבון</h3>
        <Formik
          initialValues={{ password: "", newPassword: "", confirmPassword: "" }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            userStore
              .update({ password: values.password, id: user.id })
              .then(() =>
                setStatus({ message: "Password was changed successfully." })
              )
              .catch((e: APIErrorResponse) => setStatus({ error: e.message }))
              .finally(() => setSubmitting(false));
          }}
          validationSchema={accountValidationSchema}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <FormLabel htmlFor="password" value="סיסמה" />
              <FormField name="password" type="password" placeholder="סיסמה" />
              <ErrorMessage name="password" />

              <FormLabel htmlFor="newPassword" value="סיסמה חדשה" />
              <FormField
                name="newPassword"
                type="password"
                placeholder="סיסמה חדשה"
              />
              <ErrorMessage name="newPassword" />

              <FormLabel htmlFor="confirmPassword" value="אימות סיסמה" />
              <FormField
                name="confirmPassword"
                type="password"
                placeholder="אימות סיסמה"
              />
              <ErrorMessage name="confirmPassword" />

              <StatusMessage formStatus={status} />

              <SubmitButton isSubmitting={isSubmitting} value="שינוי סיסמה" />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
});

export default Profile;
