import SideNavbar from "./side-navbar.component";
import React from "react";
import TopNavbar from "./top-navbar.component";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex-col min-h-screen w-full">
      <TopNavbar />
      <div className="w-5/6 flex justify-center">
        <SideNavbar />
        <main className="w-full h-full">
          <div className="m-auto w-2/3">{children}</div>
        </main>
      </div>
    </div>
  );
}
