import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useStores } from "../../stores";
import ProfileMenu from "./profile-menu.component";
import Link from "next/link";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";

const TopNavbar = observer(() => {
  const [profileMenu, setProfileMenu] = useState(false);

  const { userStore } = useStores();

  const { user } = userStore;

  return (
    <nav className="h-8">
      <ul className="mx-3">
        <div className="float-left">
          <Link href="/">
            <li className="flex items-center justify-center cursor-pointer">
              <a className="text-2xl flex items-center justify-center">
                <FontAwesomeIcon icon={faPaw} className="inline w-6 mr-2" />{" "}
                MyWay
              </a>
            </li>
          </Link>
        </div>
        <li
          className="inline float-right"
          onMouseEnter={() => setProfileMenu(!profileMenu)}
          onMouseLeave={() => setProfileMenu(!profileMenu)}
        >
          {user ? (
            user.profileImage ? (
              <img
                src={user.profileImage}
                className="rounded-full h-10 w-10 flex items-center justify-center"
              />
            ) : (
              <>{user.name}</>
            )
          ) : (
            <>Guest</>
          )}
          <FontAwesomeIcon icon={faSortDown} className="w-3 inline-block" />
          {profileMenu && <ProfileMenu />}
        </li>
      </ul>
    </nav>
  );
});

export default TopNavbar;
