import SideNavbar from "./side-navbar.component";
import React from "react";
import TopNavbar from "./top-navbar.component";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex min-h-screen w-full">
      <SideNavbar />
      <div className="flex-col w-full">
        <div>
          <TopNavbar />
        </div>
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}
