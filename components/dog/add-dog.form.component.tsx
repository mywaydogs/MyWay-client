import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import Router from "next/router";
import { APICreateResult } from "../../dto/api/api-create-result";
import { APIErrorResponse } from "../../dto/api/api-error-response";
import { CreateDogDto } from "../../dto/dogs/create-dog.dto";
import { useStores } from "../../stores";
import ErrorMessage from "../utils/forms/error-message.component";
import FormField from "../utils/forms/form-field.component";
import FormLabel from "../utils/forms/form-label.component";
import StatusMessage from "../utils/forms/status-message.component";
import SubmitButton from "../utils/forms/submit-button.component";
import * as Yup from "yup";
import DogSelectField from "./dog-select-field.component";

const addDogSchema = Yup.object().shape({
  name: Yup.string().required("שדה השם הינו חובה."),
  ageYears: Yup.number()
    .typeError("שדה גיל הכלב בשנים חייב להיות מספר.")
    .positive("שדה גיל הכלב בשנים חייב להיות חיובי.")
    .integer("שדה גיל הכלב בשנים חייב להיות מספר שלם."),
  ageMonths: Yup.number()
    .typeError("שדה גיל הכלב בחודשים חייב להיות מספר.")
    .positive("שדה גיל הכלב בחודשים חייב להיות חיובי.")
    .integer("שדה גיל הכלב בחודשים חייב להיות מספר שלם."),
  breed: Yup.string(),
  socialization: Yup.string(),
  litterSeparation: Yup.string(),
  origin: Yup.string(),
  healthIssues: Yup.string(),
  foodDrive: Yup.string(),
  preyDrive: Yup.string(),
  currentSchedule: Yup.string(),
  energyLevel: Yup.string(),
  homeBehaviours: Yup.string(),
  outsideBehaviours: Yup.string(),
});

const AddDogForm = observer(function AddDogForm({
  customerId,
}: {
  customerId: number;
}) {
  const { dogsStore } = useStores();

  const initialValues: CreateDogDto = {
    customerId,
    name: "",
    ageYears: 0,
    ageMonths: 0,
    breed: "",
    socialization: "",
    litterSeparation: "",
    origin: "",
    healthIssues: "",
    foodDrive: "Low",
    preyDrive: "Low",
    currentSchedule: "",
    energyLevel: "Low",
    homeBehaviours: "",
    outsideBehaviours: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setStatus, setSubmitting }) => {
        dogsStore
          .create(values)
          .then((res: APICreateResult) => {
            setStatus({
              message: "הוספת הכלב בוצעה בהצלחה.",
            });
            setTimeout(() => Router.push(`/dogs/${res.id}`), 1500);
          })
          .catch((e: APIErrorResponse) => setStatus({ error: e.message }))
          .finally(() => setSubmitting(false));
      }}
      validationSchema={addDogSchema}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <div className="bg-gray-300 rounded-lg p-5 my-5">
            <h3 className="text-2xl my-3">תכונות הכלב</h3>
            <FormLabel htmlFor="name" value="שם" />
            <FormField name="name" placeholder="רקסי" />
            <ErrorMessage name="name" />

            <FormLabel htmlFor="ageYears" value="גיל (בשנים)" />
            <FormField name="ageYears" type="number" placeholder="0" />
            <ErrorMessage name="ageYears" />

            <FormLabel htmlFor="ageMonths" value="גיל (בחודשים)" />
            <FormField name="ageMonths" type="number" placeholder="0" />
            <ErrorMessage name="ageMonths" />

            <FormLabel htmlFor="breed" value="גזע" />
            <FormField name="breed" placeholder="גזע" />
            <ErrorMessage name="breed" />
          </div>

          <div className="bg-gray-300 rounded-lg p-5 my-5">
            <h3 className="text-2xl my-3">תקופת גורות</h3>
            <FormLabel htmlFor="socialization" value="חשיפה" />
            <FormField name="socialization" placeholder="חשיפה" />
            <ErrorMessage name="socialization" />

            <FormLabel htmlFor="litterSeparation" value="מספר חודשים בשגר" />
            <FormField name="litterSeparation" placeholder="מספר חודשים בשגר" />
            <ErrorMessage name="litterSeparation" />

            <FormLabel htmlFor="origin" value="מקור הכלב" />
            <FormField name="origin" placeholder="אימוץ מעמותה" />
            <ErrorMessage name="origin" />
          </div>

          <div className="bg-gray-300 rounded-lg p-5 my-5">
            <h3 className="text-2xl my-3">אפיון נוכחי</h3>

            <FormLabel htmlFor="healthIssues" value="בעיות בריאותיות" />
            <FormField
              name="healthIssues"
              as="textarea"
              placeholder="אלרגיה לעוף, דלקת בדרכי השתן..."
            />
            <ErrorMessage name="healthIssues" />

            <FormLabel htmlFor="foodDrive" value="מוטיבציה לאוכל" />
            <DogSelectField name="foodDrive" placeholder="מוטיבציה לאוכל" />
            <ErrorMessage name="foodDrive" />

            <FormLabel htmlFor="preyDrive" value="יצר ציד" />
            <DogSelectField name="preyDrive" placeholder="יצר ציד" />
            <ErrorMessage name="preyDrive" />

            <FormLabel htmlFor="currentSchedule" value="סדר יום נוכחי" />
            <FormField
              name="currentSchedule"
              as="textarea"
              placeholder="שני טיולים, אוכל זמין תמיד, פריקת אנרגיה מועטה..."
            />
            <ErrorMessage name="currentSchedule" />

            <FormLabel htmlFor="energyLevel" value="רמת אנרגיה" />
            <DogSelectField name="energyLevel" placeholder="רמת אנרגיה" />
            <ErrorMessage name="energyLevel" />

            <FormLabel htmlFor="homeBehaviours" value="התנהגויות בבית" />
            <FormField
              name="homeBehaviours"
              as="textarea"
              placeholder="נובח על אורחים..."
            />
            <ErrorMessage name="homeBehaviours" />

            <FormLabel htmlFor="outsidebehaviours" value="התנהגויות בחוץ" />
            <FormField
              name="outsidebehaviours"
              as="textarea"
              placeholder="מתנפל על כלבים ועל עוברי אורח, מושך ברצועה..."
            />
            <ErrorMessage name="outsidebehaviours" />
          </div>

          <StatusMessage formStatus={status} />

          <SubmitButton isSubmitting={isSubmitting} value="הוספת כלב" />
        </Form>
      )}
    </Formik>
  );
});

export default AddDogForm;
