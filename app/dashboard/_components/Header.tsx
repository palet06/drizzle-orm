import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="p-2 px-5 flex items-center justify-between shadow-md fixed w-full z-10 bg-white">
      <div className="flex gap-3 items-center ">
        <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
        <h2 className="font-bold text-xl">UIGM-TEAM</h2>
      </div>
      <div className="flex gap-3 items-center">
        <Button className="bg-primaryMavi">Dashboard</Button>
        <Button>User</Button>
      </div>
    </div>
  );
};

export default Header;
