import { useUser } from "../services/auth-service";

export default function Profile() {
  const user = useUser();

  if (!user) {
    return <>Loading...</>;
  }

  return (
    <>
      {user.firstName} {user.lastName} {user.email}
    </>
  );
}
