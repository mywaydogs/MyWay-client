import _ from "lodash";

export default function StepIndicator({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  return (
    <div>
      {_.range(1, total + 1).map((i, index) => (
        <span
          key={index}
          className={`inline-block w-3 h-3 mx-1 border-none rounded-full bg-gray-${
            step === i ? "400" : "300"
          }`}
        />
      ))}
    </div>
  );
}
