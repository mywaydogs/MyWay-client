import RegisterForm from "../components/register.form.component";
import { useUser } from "../services/auth-service";

export default function Register() {
  const { user, error } = useUser({ redirectTo: "/", redirectIfFound: true });
  return (
    <>
      <RegisterForm />
    </>
  );
}
