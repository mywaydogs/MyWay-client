import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useStores } from "../../stores";

export default function ProfileMenu() {
  const { userStore } = useStores();
  const { user } = userStore;

  return (
    <div className="absolute">
      {user ? (
        <>
          <div>
            <Link href="/profile">
              <a>
                <FontAwesomeIcon icon={faUser} width="16px" /> Profile
              </a>
            </Link>
          </div>
          <div
            onClick={() => {
              axios.get("/api/auth/logout");
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} width="16px" /> Logout
          </div>
        </>
      ) : (
        <>
          <div>
            <Link href="/login">Login</Link>
          </div>
          <div>
            <Link href="/register">Register</Link>
          </div>
        </>
      )}
    </div>
  );
}
