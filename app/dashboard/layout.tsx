import React from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64">
        <SideNav />
      </div>
      <div className="bg-white z-10">
        <Header />
        <div className="md:ml-64  pt-[80px] pb-[10px] px-[20px] ">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
