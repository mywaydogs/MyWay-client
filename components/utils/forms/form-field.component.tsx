import { Field } from "formik";

export default function FormField({
  name,
  type = "text",
  placeholder = "",
  as = null,
}: {
  name: string;
  type: string;
  placeholder?: string;
  as?: null | string;
}) {
  return (
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      as={as}
      className="w-full my-2"
    />
  );
}
