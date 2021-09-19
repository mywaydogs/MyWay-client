import { Field } from "formik";
import { ReactNode } from "react";

export default function FormField({
  children,
  name,
  type = "text",
  placeholder = "",
  as = null,
}: {
  children?: ReactNode | undefined;
  name: string;
  type?: string;
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
    >
      {children}
    </Field>
  );
}
