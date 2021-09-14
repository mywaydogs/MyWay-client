interface AlertPropsInterface {
  type: "success" | "error";
  message: string;
}

export default function Alert({ type, message }: AlertPropsInterface) {
  return (
    <div
      className={`${
        type === "success"
          ? "bg-green-100  border-green-400 text-green-700"
          : "bg-red-100  border-red-400 text-red-700"
      } px-4 py-3 rounded relative border w-full text-center my-3`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
