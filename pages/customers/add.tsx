import { observer } from "mobx-react-lite";
import Router from "next/router";
import { useState } from "react";
import AddCustomerForm from "../../components/customer/add-customer.form.component";
import AddDogForm from "../../components/dog/add-dog.form.component";

const AddCustomerPage = observer(function AddCustomerPage() {
  const [step, setStep] = useState<number>(0);
  const [customerId, setCustomerId] = useState<null | number>(null);

  const onCustomerAdded = (customerId: number) => {
    setStep(step + 1);
    setCustomerId(customerId);
  };

  return (
    <>
      {step === 0 && <AddCustomerForm onCustomerAdded={onCustomerAdded} />}
      {step === 1 && (
        <>
          Would you like to add a dog as well?
          <button onClick={() => setStep(step + 1)}>Yes</button>{" "}
          <button onClick={() => Router.push("/customers")}>No</button>
        </>
      )}
      {step === 2 && customerId && <AddDogForm customerId={customerId} />}
    </>
  );
});

export default AddCustomerPage;
