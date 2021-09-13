import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useUser } from "../../services/auth.service";

export default function SideNavbar() {
  const user = useUser();

  return (
    <div className="flex-col lg:w-1/6 sm:w-1/2">
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>
                MyWay <FontAwesomeIcon icon={faPaw} className="w-4 inline-block" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/customers">Customers</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
