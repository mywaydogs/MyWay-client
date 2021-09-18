import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useStores } from "../../stores";

const ProfileMenu = observer(function ProfileMenu() {
  const { userStore } = useStores();
  const { user } = userStore;

  return (
    <div className="absolute border w-48 transform -translate-x-3/4 mt-2 bg-gray-100 rounded-lg p-3">
      {user ? (
        <>
          <Link href="/profile">
            <a className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="w-4 inline mr-2" />{" "}
              Profile
            </a>
          </Link>
          <div
            className="cursor-pointer"
            onClick={() => {
              userStore.logout();
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-4 inline mr-2" />
            Logout
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
});

export default ProfileMenu;
