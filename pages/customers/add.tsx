import { observer } from "mobx-react-lite";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/buttons/button.component";
import AddCustomerForm from "../../components/customer/add-customer.form.component";
import AddDogForm from "../../components/dog/add-dog.form.component";
import StepIndicator from "../../components/utils/forms/step-indicator.component";
import Spinner from "../../components/utils/spinner.component";

const AddDogMessage = observer(function AddDogMessage({
  customerId,
  nextStep,
}: {
  customerId: number;
  nextStep: Function;
}) {
  const router = useRouter();
  return (
    <>
      <div className="flex-col justify-center">
        <div className="flex justify-center text-lg">
          האם תרצה להוסיף גם כלב?
        </div>
        <div className="flex justify-around">
          <Button onClick={() => nextStep()}>כן</Button>{" "}
          <Button onClick={() => router.push(`/customers/${customerId}`)}>
            מעבר לדף לקוח
          </Button>
          <Button onClick={() => router.push("/")}>מעבר לדף הבית</Button>
        </div>
      </div>
    </>
  );
});

const AddCustomerPage = observer(function AddCustomerPage() {
  const [step, setStep] = useState<number>(0);
  const [customerId, setCustomerId] = useState<null | number>(null);

  const nextStep = () => {
    setStep(step + 1);
  };

  const onCustomerAdded = (customerId: number) => {
    setCustomerId(customerId);
    nextStep();
  };

  return (
    <>
      <div style={{ display: step == 0 ? "initial" : "none" }}>
        <h1>הוספת לקוח</h1>
        <AddCustomerForm onCustomerAdded={onCustomerAdded} />
      </div>
      {step === 1 && customerId && (
        <AddDogMessage customerId={customerId} nextStep={nextStep} />
      )}
      {step === 2 && (
        <div>
          <h1>הוספת כלב</h1>
          {customerId ? <AddDogForm customerId={customerId} /> : <Spinner />}
        </div>
      )}
      <div className="flex justify-center items-center my-5">
        <StepIndicator step={step} total={3} />
      </div>
    </>
  );
});

export default AddCustomerPage;
