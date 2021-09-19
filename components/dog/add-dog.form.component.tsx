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
  name: Yup.string().required("Name is required."),
  ageYears: Yup.number()
    .typeError("Age in years must be a number.")
    .positive("Age in years must be positive.")
    .integer("Age in years must be an integer."),
  ageMonths: Yup.number()
    .typeError("Age in years must be a number.")
    .positive("Age in months must be positive.")
    .integer("Age in months must be an integer."),
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
              message: "Dog was created successfully.",
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
            <h3 className="text-2xl my-3">Dog Attributes</h3>
            <FormLabel htmlFor="name" value="Name" />
            <FormField name="name" placeholder="Name" />
            <ErrorMessage name="name" />

            <FormLabel htmlFor="ageYears" value="Age (Years)" />
            <FormField
              name="ageYears"
              type="number"
              placeholder="Age (Years)"
            />
            <ErrorMessage name="ageYears" />

            <FormLabel htmlFor="ageMonths" value="Age (Months)" />
            <FormField
              name="ageMonths"
              type="number"
              placeholder="Age (Months)"
            />
            <ErrorMessage name="ageMonths" />

            <FormLabel htmlFor="breed" value="Breed" />
            <FormField name="breed" placeholder="Breed" />
            <ErrorMessage name="breed" />
          </div>

          <div className="bg-gray-300 rounded-lg p-5 my-5">
            <h3 className="text-2xl my-3">Puppyhood</h3>
            <FormLabel htmlFor="socialization" value="Socialization" />
            <FormField name="socialization" placeholder="Socialization" />
            <ErrorMessage name="socialization" />

            <FormLabel htmlFor="litterSeparation" value="Litter Separation" />
            <FormField
              name="litterSeparation"
              placeholder="Litter Separation"
            />
            <ErrorMessage name="litterSeparation" />

            <FormLabel htmlFor="origin" value="Dog's Origin" />
            <FormField name="origin" placeholder="Dog's Origin" />
            <ErrorMessage name="origin" />
          </div>

          <div className="bg-gray-300 rounded-lg p-5 my-5">
            <h3 className="text-2xl my-3">Current Characterization</h3>

            <FormLabel htmlFor="healthIssues" value="Health Issues" />
            <FormField
              name="healthIssues"
              as="textarea"
              placeholder="Health Issues"
            />
            <ErrorMessage name="healthIssues" />

            <FormLabel htmlFor="foodDrive" value="Food Drive" />
            <DogSelectField name="foodDrive" placeholder="Food Drive" />
            <ErrorMessage name="foodDrive" />

            <FormLabel htmlFor="preyDrive" value="Prey Drive" />
            <DogSelectField name="preyDrive" placeholder="Prey Drive" />
            <ErrorMessage name="preyDrive" />

            <FormLabel htmlFor="currentSchedule" value="Current Schedule" />
            <FormField
              name="currentSchedule"
              as="textarea"
              placeholder="Current Schedule"
            />
            <ErrorMessage name="currentSchedule" />

            <FormLabel htmlFor="energyLevel" value="Energy Level" />
            <DogSelectField name="energyLevel" placeholder="Energy Level" />
            <ErrorMessage name="energyLevel" />

            <FormLabel htmlFor="homeBehaviours" value="Home Behaviours" />
            <FormField
              name="homeBehaviours"
              as="textarea"
              placeholder="Home Behaviours"
            />
            <ErrorMessage name="homeBehaviours" />

            <FormLabel htmlFor="outsidebehaviours" value="Outside Behaviours" />
            <FormField
              name="outsidebehaviours"
              as="textarea"
              placeholder="Outside Behaviours"
            />
            <ErrorMessage name="outsidebehaviours" />
          </div>

          <StatusMessage formStatus={status} />

          <SubmitButton isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
});

export default AddDogForm;
