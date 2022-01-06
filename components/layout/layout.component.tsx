import SideNavbar from "./side-navbar.component";
import React from "react";
import TopNavbar from "./top-navbar.component";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex min-h-screen">
      <div className="sm:w-1/2 lg:w-1/4 bg-gray-50">
        <SideNavbar />
      </div>
      <div className="flex-col sm:w-1/2 lg:w-3/4">
        <TopNavbar />
        <main className="w-full h-full">
          <div className="m-auto p-3">{children}</div>
        </main>
      </div>
    </div>
  );
}
