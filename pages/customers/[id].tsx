import { useRouter } from "next/router";
import { CustomerDto } from "../../dto/customers/customer.dto";
import AddDogForm from "../../components/dog/add-dog.form.component";
import { DogDto } from "../../dto/dogs/dog.dto";
import DogsTiles from "../../components/dog/dogs-tiles.component";
import { useEffect, useState } from "react";
import { useStores } from "../../stores";
import Spinner from "../../components/utils/spinner.component";

export default function CustomerPage() {
  const [customer, setCustomer] = useState<CustomerDto | null>(null);
  const [dogs, setDogs] = useState<DogDto[] | null>(null);

  const router = useRouter();
  const customerId = parseInt(router.query.id as string, 10);

  const { dogsStore, customersStore } = useStores();

  useEffect(() => {
    if (customerId) {
      customersStore
        .findOne(customerId)
        .then((customer: CustomerDto) => setCustomer(customer))
        .then(() => dogsStore.findAll({ customerId }))
        .then((dogs: DogDto[]) => setDogs(dogs));
    }
  }, [customerId]);

  if (!customer) {
    return <Spinner />;
  }

  return (
    <>
      {customer.firstName} {customer.lastName} {customer.email}{" "}
      {customer.address} {customer.phone}
      <AddDogForm customerId={customer.id} />
      {dogs == null && <Spinner />}
      {dogs && dogs.length === 0 && (
        <>This customer doesn't have any dogs yet. Create one.</>
      )}
      {dogs && <DogsTiles dogs={dogs} />}
    </>
  );
}
