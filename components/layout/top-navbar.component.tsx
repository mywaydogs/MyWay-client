import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useStores } from "../../stores";
import ProfileMenu from "./profile-menu.component";

export default function TopNavbar() {
  const [profileMenu, setProfileMenu] = useState(false);

  const { userStore } = useStores();

  const { user } = userStore;

  return (
    <nav>
      <ul className="flex">
        <li onClick={() => setProfileMenu(!profileMenu)}>
          {user ? (
            <>
              {user.firstName} {user.lastName}
            </>
          ) : (
            <>Guest</>
          )}
          <FontAwesomeIcon icon={faSortDown} className="w-3 inline-block" />
          {profileMenu && <ProfileMenu />}
        </li>
      </ul>
    </nav>
  );
}
