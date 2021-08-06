import LoginForm from "../components/login.form.component";
import { useUser } from "../services/auth-service";

export default function Login() {
  const user = useUser({ redirectTo: "/", redirectIfFound: true });
  return (
    <>
      <LoginForm />
    </>
  );
}
