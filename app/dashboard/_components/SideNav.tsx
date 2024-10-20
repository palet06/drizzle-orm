"use client";
import {
  FolderGit2,
  ListTodo,
  Minus,
  PanelsTopLeft,
  Shield,
  Users,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {
  const menuOptions = [
    {
      id: 1,
      name: "Anasayfa",
      path: "/dashboard",
      icon: PanelsTopLeft,
    },
    {
      id: 2,
      name: "Projeler",
      path: "/dashboard/projects",
      icon: FolderGit2,
    },
    {
      id: 3,
      name: "Danışmanlar",
      path: "/dashboard/team-members",
      icon: Users,
    },
    {
      id: 4,
      name: "İdare",
      path: "/dashboard/executives",
      icon: Shield,
    },
    {
      id: 5,
      name: "Seperator",
      path: "",
      icon: Minus
    },
    {
      id: 6,
      name: "Görevler",
      path: "/dashboard/tasks",
      icon: ListTodo,
    },
    
  ];
  const path = usePathname();

  return (
    <div className="w-64 h-screen shadow-md p-5">
      <div className="grid gap-3">
        {menuOptions.map((item, index: number) => (
          <>
            {item.name.includes("Seperator") ? (
              <div key={index} className="flex items-center gap-3 p-3 w-full">
                <div className="w-full h-[1px] border-[1px] border-gray-200"></div>
                  
              </div>
            ) : (
              <Link href={item.path} key={index}>
                <div
                  className={`flex items-center gap-3 p-3
                    hover:bg-primaryMavi hover:text-white
                    rounded-md cursor-pointer
                    ${path == item.path && "bg-primaryMavi text-white"}
                    `}
                >
                  <item.icon />
                  <h2>{item.name}</h2>
                </div>
              </Link>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
