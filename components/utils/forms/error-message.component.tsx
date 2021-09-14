import { ErrorMessage as FormikErrorMessage } from "formik";

interface PropsInterface {
  name: string;
}

export default function ErrorMessage({ name }: PropsInterface) {
  return (
    <div className="w-full text-sm text-red-500">
      <FormikErrorMessage name={name} />
    </div>
  );
}
