import { faDog, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function SideNavbar() {
  return (
    <div className="flex-col lg:w-1/6 sm:w-1/2">
      <nav className="bg-gray-100 my-5">
        <ul>
          <Link href="/dogs">
            <li className="rounded cursor-pointer hover:bg-gray-50 h-8 flex items-center justify-center">
              <FontAwesomeIcon icon={faDog} className="w-5 mr-2" /> Dogs
            </li>
          </Link>
          <Link href="/customers">
            <li className="rounded cursor-pointer hover:bg-gray-50 h-8 flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="w-5 mr-2" /> Customers
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
