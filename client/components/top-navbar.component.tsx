import axios from "axios";
import Link from "next/link";
import { useUser } from "../services/auth-service";
import styles from "../styles/TopNavbar.module.css";

export default function TopNavbar() {
  const { user, error } = useUser();

  return (
    <nav className={styles.topNav}>
      <ul>
        {user && (
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        )}
        {!user && (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <a href="">
              <span
                onClick={() => {
                  axios.get("/api/auth/logout");
                }}
              >
                Logout
              </span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
