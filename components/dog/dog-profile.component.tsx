import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { DogDto } from "../../dto/dogs/dog.dto";
import {
  calculateDiffInMonths,
  calculateDiffInYears,
} from "../../services/time.service";
import Spinner from "../utils/spinner.component";

export default function DogProfile({ dog }: { dog: DogDto }) {
  if (dog == null) {
    return <Spinner />;
  }

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
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" placeholder="Name" />
              <ErrorMessage name="name" />
            </div>

            <div>
              <label htmlFor="color">Color</label>
              <Field name="color" placeholder="Color" />
              <ErrorMessage name="color" />
            </div>
            <div>
              <label htmlFor="breed">Breed</label>
              <Field name="breed" placeholder="Breed" />
              <ErrorMessage name="breed" />
            </div>
            <div>
              <label htmlFor="age_years">Age (years)</label>
              <Field name="age_years" placeholder="Age (years)" />
              <ErrorMessage name="age_years" />

              <label htmlFor="age_months">Age (months)</label>
              <Field name="age_months" placeholder="Age (months)" />
              <ErrorMessage name="age_months" />
            </div>

            {!isSubmitting ? (
              <button type="submit" disabled={isSubmitting}>
                Save Changes
              </button>
            ) : (
              <>saving...</>
            )}

            {status && <>{status.message}</>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
