import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStores } from "../../stores";
import ProfileMenu from "./profile-menu.component";
import Image from "next/image";

const TopNavbar = observer(function TopNavBar() {
  const [profileMenu, setProfileMenu] = useState(false);
  const [delayHandler, setDelayHandler] = useState<null | ReturnType<
    typeof setTimeout
  >>(null);

  const { userStore } = useStores();

  const { user } = userStore;

  return (
    <div className="flex justify-end">
      <div
        className="mx-2"
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
            <Image
              src={user.profileImage}
              width={40}
              height={40}
              alt="Small round profile image of the user"
              className="rounded-full"
            />
          ) : (
            <>{user.name}</>
          )
        ) : (
          <>אורח</>
        )}
        {profileMenu && <ProfileMenu />}
      </div>
    </div>
  );
});

export default TopNavbar;
