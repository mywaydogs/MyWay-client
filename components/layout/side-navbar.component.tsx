import { faDog, faPaw, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function SideNavbar() {
  return (
    <nav className="bg-gray-100 my-5">
      <ul>
        <Link href="/">
          <li className="flex items-center justify-center cursor-pointer">
            <a className="text-2xl flex items-center justify-center">
              <FontAwesomeIcon icon={faPaw} className="inline w-6 mx-2" />{" "}
              <span style={{ fontFamily: "Pacifico" }}>MyWay</span>
            </a>
          </li>
        </Link>
        <Link href="/dogs">
          <li className="rounded cursor-pointer hover:bg-gray-50 h-8 flex items-center justify-center">
            <FontAwesomeIcon icon={faDog} className="w-5 mx-2" />
            הכלבים שלי
          </li>
        </Link>
        <Link href="/customers">
          <li className="rounded cursor-pointer hover:bg-gray-50 h-8 flex items-center justify-center">
            <FontAwesomeIcon icon={faUsers} className="w-5 mx-2" />
            הלקוחות שלי
          </li>
        </Link>
      </ul>
    </nav>
  );
}
