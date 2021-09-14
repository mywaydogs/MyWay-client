import RegisterForm from "../components/auth/register.form.component";
import { useUser } from "../services/auth.service";

export default function Register() {
  const { user, error } = useUser({ redirectTo: "/", redirectIfFound: true });
  return (
    <div className="h-full flex items-center justify-center">
      <div>
        <div className="flex justify-center items-center">
          <h1 className="text-4xl">Register</h1>
        </div>
        <div className="flex justify-center items-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
