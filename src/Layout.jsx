// Layout.jsx
import React from "react";
import { Sidebar, Navbar } from "../src/components/index";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-[100vh] flex">
      <div className="w-[20%] bg-primary-500 border-r-[1px] border-gray-200 shadow-md">
        <Sidebar />
      </div>
      <div className="w-[calc(100%-20%)]">
        <div className="w-full h-fit">
          <Navbar />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
