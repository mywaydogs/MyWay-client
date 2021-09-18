import Alert from "../alert.component";

export interface FormStatus {
  message?: string;
  error?: string;
}

export default function StatusMessage({
  formStatus,
}: {
  formStatus: FormStatus;
}) {
  return (
    <>
      {formStatus?.error && <Alert type="error" message={formStatus?.error} />}

      {formStatus?.message && (
        <Alert type="success" message={formStatus?.message} />
      )}
    </>
  );
}
