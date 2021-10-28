import Link from "next/link";
import LoginForm from "../components/auth/login.form.component";

export default function Login() {
  return (
    <div className="h-full flex items-center justify-center">
      <div>
        <div className="flex justify-center items-center">
          <h1 className="text-4xl">התחברות</h1>
        </div>
        <div className="flex justify-center items-center">
          <LoginForm />
        </div>
        <div className="flex justify-center my-4">
          אין לך חשבון?
          <Link href="/register">
            <a className="mx-1 font-medium underline">הירשם</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
