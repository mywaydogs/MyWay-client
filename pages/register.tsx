import RegisterForm from "../components/auth/register.form.component";
import { useUser } from "../services/auth.service";

export default function Register() {
  const { user, error } = useUser({ redirectTo: "/", redirectIfFound: true });
  return (
    <div className="flex-col items-center">
      <div className="w-full flex justify-center">
        <h1>Register</h1>
      </div>
      <div className="w-full flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
