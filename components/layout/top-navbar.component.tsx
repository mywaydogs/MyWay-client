import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStores } from "../../stores";
import ProfileMenu from "./profile-menu.component";

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
            <img
              src={user.profileImage}
              className="rounded-full h-10 w-10 flex items-center justify-center"
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
