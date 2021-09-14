import {
  faArrowCircleDown,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "../../services/auth.service";
import ProfileMenu from "./profile-menu.component";

export default function TopNavbar() {
  const { user, error } = useUser();
  const [profileMenu, setProfileMenu] = useState(false);

  return (
    <nav>
      <ul className='flex'>
        <li
          onClick={() => setProfileMenu(!profileMenu)}
        >
          {user ? (
            <>
              {user.firstName} {user.lastName}
            </>
          ) : (
            <>Guest</>
          )}
          <FontAwesomeIcon icon={faSortDown} className="w-3 inline-block" />
          {profileMenu && <ProfileMenu user={user} />}
        </li>
      </ul>
    </nav>
  );
}
