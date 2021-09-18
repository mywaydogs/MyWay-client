import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useStores } from "../../stores";
import ProfileMenu from "./profile-menu.component";
import Link from "next/link";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";

const TopNavbar = observer(function TopNavBar() {
  const [profileMenu, setProfileMenu] = useState(false);
  const [delayHandler, setDelayHandler] = useState<null | ReturnType<
    typeof setTimeout
  >>(null);

  const { userStore } = useStores();

  const { user } = userStore;

  return (
    <nav className="flex justify-center h-8">
      <ul className="w-10/12">
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
          onMouseEnter={() => {
            setProfileMenu(true);
            if (delayHandler) {
              clearTimeout(delayHandler);
            }
          }}
          onMouseLeave={() =>
            setDelayHandler(
              setTimeout(() => {
                setProfileMenu(false);
              }, 300)
            )
          }
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
          {profileMenu && <ProfileMenu />}
        </li>
      </ul>
    </nav>
  );
});

export default TopNavbar;
