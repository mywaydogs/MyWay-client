import SideNavbar from "./side-navbar.component";
import React from "react";
import TopNavbar from "./top-navbar.component";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex">
      <div className="sm:w-1/2 lg:w-1/4 min-h-screen bg-gray-50">
        <SideNavbar />
      </div>
      <div className="flex-col flex-grow">
        <TopNavbar />
        <main className="w-full h-full">
          <div className="m-auto w-2/3">{children}</div>
        </main>
      </div>
    </div>
  );
}
