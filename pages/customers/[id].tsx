import { useRouter } from "next/router";
import useSWR from "swr";
import { CustomerDto } from "../../dto/customer.dto";
import AddDogForm from "../../components/dog/add-dog.form.component";
import { DogDto } from "../../dto/dog.dto";
import DogsTiles from "../../components/dog/dogs-tiles.component";

export default function CustomerPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: customerData, error: customerError } = useSWR(
    id ? `/api/customers/${id}` : null
  );

  const customer: CustomerDto = customerData?.data;

  const { data: dogsData, error: dogsError } = useSWR(
    customer ? `/api/dogs?customerId=${customer.id}` : null
  );

  const dogs: DogDto[] = dogsData?.data;

  if (!customer) {
    return <>Loading...</>;
  }

  return (
    <>
      {customer.firstName} {customer.lastName} {customer.email}{" "}
      {customer.address} {customer.phone}
      <AddDogForm customerId={customer.id} />
      <DogsTiles dogs={dogs} />
    </>
  );
}
