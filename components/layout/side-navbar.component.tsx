import {faDog, faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Logo from "./logo.component";

export default function SideNavbar() {
  return (
      <nav className="bg-gray-100 my-5">
        <ul>
          <Link href="/" passHref>
            <li className="flex items-center justify-center cursor-pointer">
              <a className="text-2xl flex items-center justify-center">
                <Logo/>
                <span style={{fontFamily: "Pacifico"}}>MyWay</span>
              </a>
            </li>
          </Link>
          <Link href="/dogs" passHref>
            <li className="rounded cursor-pointer hover:bg-gray-50 h-8 flex items-center justify-center">
              <FontAwesomeIcon icon={faDog} className="w-5 mx-2"/>
              הכלבים שלי
            </li>
          </Link>
          <Link href="/customers" passHref>
          <li className="rounded cursor-pointer hover:bg-gray-50 h-8 flex items-center justify-center">
            <FontAwesomeIcon icon={faUsers} className="w-5 mx-2" />
            הלקוחות שלי
          </li>
        </Link>
      </ul>
    </nav>
  );
}
