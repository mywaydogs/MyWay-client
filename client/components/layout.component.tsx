import SideNavbar from "./side-navbar.component";
import React from "react";
import styles from "../styles/Layout.module.css";
import TopNavbar from "./top-navbar.component";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className={styles.rootDiv}>
      <SideNavbar />
      <div className={styles.mainDiv}>
        <TopNavbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
