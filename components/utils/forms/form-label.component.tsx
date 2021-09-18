export default function FormLabel({
  htmlFor,
  value,
}: {
  htmlFor: string;
  value: string;
}) {
  return (
    <label className="block font-medium" htmlFor={htmlFor}>
      {value}
    </label>
  );
}
