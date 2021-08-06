import Link from "next/link";
import { useUser } from "../services/auth-service";
import axios from "axios";
import styles from "../styles/SideNavbar.module.css";

export default function SideNavbar() {
  const user = useUser();

  return (
    <nav className={styles.sideNavbar}>
      <ul>
        <li className={styles.myway}>
          <Link href="/">MyWay</Link>
        </li>
        <li>
          <Link href="/customers">Customers</Link>
        </li>
      </ul>
    </nav>
  );
}
