

import React from "react";


import Image from "next/image";
import {  Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { teamMemberSelectType, userProjectsSelectType } from "@/lib/dbactions/index";

const TeamCards = ({
  membersList,
  userProjects,
}: {
  membersList: teamMemberSelectType;
  userProjects: userProjectsSelectType;
}) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {/* card container */}
      {membersList.length > 0 ? (
        membersList.map((member, index) => (
          <div
            key={index}
            className="rounded-xl  border-black min-w-[300px] max-w-[350px]  shadow-xl"
          >
            <div className="">
              <div className="flex justify-center items-center rounded-tl-xl p-3 h-[200px] rounded-tr-xl bg-gradient-to-r from-indigo-500 to-blue-500">
                <div>
                  <Image
                    className="rounded-xl border-[1px] border-black  "
                    src={member.profilePictureUrl?member.profilePictureUrl:"/profile.jpg"}
                    height={150}
                    width={150}
                    alt="onur-tosun"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="w-full  flex flex-col p-3">
                  <h3 className="font-bold text-xl">
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
              <div className="flex  flex-col p-3   ">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border shadow-md">
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-3 h-[64px]  font-bold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Sorumlu Olduğu Proje(ler)
                      </th>

                      <ul className="flex flex-col justify-center h-[64px] list-disc">
                        {userProjects?.map((up, i) =>
                          up.GuserId === member.userId ? (
                            <li key={i}>
                              <td>{up.projectName}</td>
                            </li>
                          ) : (
                            ""
                          )
                        )}
                      </ul>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-3 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Atanan Görevler
                      </th>
                      <td className="px-6 py-4 w-ful flex justify-center ">
                     
                        <>{member.assignedTasks.length}</>
                       
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
                        <>
                          {
                            member.assignedTasks?.filter(
                              (d) => d.task.isDone == true
                            ).length
                          }
                        </>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="w-full py- ">
                  <div className="border-[1px] bg-black"></div>
                </div>
                <div className="w-full py-3">
                <Link href={`team-members/${member.userId}`}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600">
                    Ayrıntılar
                  </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h3>Yaızlım Danışmanı Bulunamadı</h3>
      )}
    </div>
  );
};

export default TeamCards;
