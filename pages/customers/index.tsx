import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../../components/utils/spinner.component";
import { CustomerDto } from "../../dto/customers/customer.dto";
import { useStores } from "../../stores";

const CustomersPage = observer(function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerDto[] | null>(null);

  const { customersStore } = useStores();

  useEffect(() => {
    customersStore
      .findAll()
      .then((customers: CustomerDto[]) => setCustomers(customers));
  }, [customersStore]);

  if (customers == null) {
    return <Spinner />;
  }

  return (
    <>
      <Link href="/customers/add">New Customer</Link>

      {/* TODO: Search by customer firstname, lastname, a customer's contact first name or last name, or a dog's name */}

      {customers.length === 0 && <>You have no customers yet. Create one.</>}

      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            <Link href={`/customers/${c.id}`}>
              <a>
                {c.firstName} {c.lastName} {c.email} {c.address} {c.phone}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
});

export default CustomersPage;
