"use client";

import React from "react";

import { teamMemberSelectType, userProjectsSelectType } from "../page";
import Image from "next/image";
import { Dot } from "lucide-react";
import { Button } from "@/components/ui/button";

const TeamCards = ({
  membersList,
  userProjects,
}: {
  membersList: teamMemberSelectType;
  userProjects: userProjectsSelectType;
}) => {
  return (
    <div className="grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2">
      {/* card container */}
      <div className="rounded-xl  border-black min-w-[400px] max-w-[400px]  shadow-xl">
        {membersList.length > 0 ? (
          membersList.map((member, index) => (
            <div key={index} className="">
              <div className="flex justify-center items-center  rounded-tl-xl p-3 h-[200px] rounded-tr-xl bg-gradient-to-r from-indigo-500 to-blue-500">
                <div>
                  <Image
                    className="rounded-xl border-[1px] border-black  "
                    src={member.profilePictureUrl!}
                    height={150}
                    width={150}
                    alt="onur-tosun"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="w-full  flex flex-col p-3">
                  <h3 className="font-bold text-2xl">
                    {member.name} {member.surname?.toUpperCase()}
                  </h3>
                  <p className="flex text-sm items-center">
                    @{member.username?.toString()} <Dot />
                    <span className="text-gray-400">
                      {member.createdDate?.toLocaleString("tr-TR", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                  <div className="w-full py-3 ">
                    <div className="border-[1px] bg-black"></div>
                  </div>
                </div>
              </div>
              <div className="flex  flex-col p-3 relative  ">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border shadow-md">
                  <tbody>
                    <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                      <th
                        scope="row"
                        className="px-3 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Sorumlu Olduğu Proje(ler)
                      </th>
                      <div className="flex px-3 py-4 flex-row gap-2 items-center w-ful  justify-center">
                        {userProjects.map((up, i) =>
                          up.GuserId === member.userId ? (
                            <>
                              <td key={i}>{up.projectName}</td>
                              {i >= userProjects.length + 1 ? "" : "|"}
                            </>
                          ) : (
                            ""
                          )
                        )}
                      </div>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-3 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Atanan Görevler
                      </th>
                      <td className="px-6 py-4 w-ful flex justify-center ">
                        5
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-3 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Tamamlanan Görevler
                      </th>
                      <td className="px-6 py-4 w-ful flex justify-center ">
                        3
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="w-full py- ">
                  <div className="border-[1px] bg-black"></div>
                </div>
                <div className="w-full py-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600">
                    Ayrıntılar
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3>Yaızlım Danışmanı Bulunamadı</h3>
        )}
      </div>
    </div>
  );
};

export default TeamCards;
