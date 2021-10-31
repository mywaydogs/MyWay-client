import { observer } from "mobx-react-lite";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import AddCustomerForm from "../../components/customer/add-customer.form.component";
import AddDogForm from "../../components/dog/add-dog.form.component";
import StepIndicator from "../../components/utils/forms/step-indicator.component";
import Spinner from "../../components/utils/spinner.component";

const AddCustomerPage = observer(function AddCustomerPage() {
  const [step, setStep] = useState<number>(0);
  const [customerId, setCustomerId] = useState<null | number>(null);

  const router = useRouter();

  const onCustomerAdded = (customerId: number) => {
    setCustomerId(customerId);
    setStep(step + 1);
  };

  return (
    <>
      <div style={{ display: step == 0 ? "initial" : "none" }}>
        <h1>הוספת לקוח</h1>
        <AddCustomerForm onCustomerAdded={onCustomerAdded} />
      </div>
      <div
        style={{ display: step == 1 ? "initial" : "none" }}
        className="flex-col justify-center"
      >
        <div className="flex justify-center text-lg">
          האם תרצה להוסיף גם כלב?
        </div>
        <div className="flex justify-around">
          <button onClick={() => setStep(step + 1)}>Yes</button>{" "}
          <button onClick={() => router.push("/customers")}>No</button>
        </div>
      </div>
      <div style={{ display: step == 2 ? "initial" : "none" }}>
        <h1>הוספת כלב</h1>
        {customerId ? <AddDogForm customerId={customerId} /> : <Spinner />}
      </div>
      <div className="flex justify-center items-center my-5">
        <StepIndicator step={step} total={3} />
      </div>
    </>
  );
});

export default AddCustomerPage;
