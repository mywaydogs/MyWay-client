import RegisterForm from "../components/auth/register.form.component";
import Link from "next/link";

export default function Register() {
  return (
    <div className="h-full flex items-center justify-center">
      <div>
        <div className="flex justify-center items-center">
          <h1 className="text-4xl">Register</h1>
        </div>
        <div className="flex justify-center items-center">
          <RegisterForm />
        </div>
        <div className="flex justify-center my-4">
          Already have an account?
          <Link href="/login">
            <a className="mx-1 font-medium underline">Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
