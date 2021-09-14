import LoginForm from "../components/auth/login.form.component";
import { useUser } from "../services/auth.service";

export default function Login() {
  const user = useUser({ redirectTo: "/", redirectIfFound: true });
  return (
    <div className="h-full flex items-center justify-center">
      <div>
        <div className="flex justify-center items-center">
          <h1 className="text-4xl">Login</h1>
        </div>
        <div className="flex justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
