import Spinner from "../spinner.component";

export default function SubmitButton({
  isSubmitting,
  value = "Submit",
}: {
  isSubmitting: boolean;
  value?: string;
}) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
    >
      {!isSubmitting && value}
      {isSubmitting && <Spinner />}
    </button>
  );
}
