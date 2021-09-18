import axios from "axios";
import { Field, Form, Formik } from "formik";
import { DogDto } from "../../dto/dogs/dog.dto";
import {
  calculateDiffInMonths,
  calculateDiffInYears,
} from "../../libraries/time.library";
import ErrorMessage from "../utils/forms/error-message.component";
import Spinner from "../utils/spinner.component";
import * as Yup from "yup";
import SubmitButton from "../utils/forms/submit-button.component";

const DogProfileSchema = Yup.object().shape({});

export default function DogProfile({ dog }: { dog: DogDto }) {
  return (
    <div>
      <div>
        <div>
          <div>Dog{"'"}s picture</div>
          <span></span>
        </div>
        <div>
          <div>
            Upload {dog.name}
            {"'"}s photo
          </div>
          <div>
            <button>Upload photo</button>
          </div>
        </div>
      </div>
      <Formik
        initialValues={{
          name: dog.name,
          color: dog.color,
          breed: dog.breed,
          age_years: calculateDiffInYears(new Date(), new Date(dog.birthDate)),
          age_months: calculateDiffInMonths(
            new Date(),
            new Date(dog.birthDate)
          ),
        }}
        onSubmit={async (values, actions) => {
          axios
            .patch(`/api/dogs/${dog.id}`, values)
            .then((res) =>
              actions.setStatus({
                status: true,
                message: "Changes were saved successfully.",
              })
            )
            .catch((e) =>
              actions.setStatus({ status: true, message: e.message })
            )
            .finally(() => actions.setSubmitting(false));
        }}
        validationSchema={DogProfileSchema}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <Field name="name" type="text" placeholder="Name" />
            <ErrorMessage name="name" />

            <Field name="color" type="text" placeholder="Color" />
            <ErrorMessage name="color" />
            <Field name="breed" type="text" placeholder="Breed" />
            <ErrorMessage name="breed" />
            <Field name="age_years" type="number" placeholder="Age (years)" />
            <ErrorMessage name="age_years" />

            <Field name="age_months" type="number" placeholder="Age (months)" />
            <ErrorMessage name="age_months" />
            
            {status && <>{status.message}</>}

            <SubmitButton isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
