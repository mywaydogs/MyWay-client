import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import AddCustomerForm from "../../components/customer/add-customer.form.component";
import { CustomerDto } from "../../dto/customer.dto";
import { useUser } from "../../services/auth.service";

export default function Customers() {
  const { user, error: userError } = useUser({ redirectTo: "/login" });
  const { data, error } = useSWR(() => `/api/customers?userId=${user.id}`);
  const customers: CustomerDto[] = data?.data;

  if (!customers) {
    return <>Loading...</>;
  }

  return (
    <>
      <AddCustomerForm />

      {/* TODO: Search by customer firstname, lastname, a customer's contact first name or last name, or a dog's name */}

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
}
