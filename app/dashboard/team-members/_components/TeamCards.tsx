"use client";

import React from "react";

import { teamMemberSelectType } from "../page";
import Image from "next/image";
import { Dot } from "lucide-react";

const TeamCards = ({ membersList }: { membersList: teamMemberSelectType }) => {
  return (
    // <div className="relative overflow-x-auto">
    //   <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    //     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //       <tr>
    //         <th scope="col" className="px-6 py-3">
    //           Danışman
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Atanmış Görevler
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Görev Durumu
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Öncelik
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Tamamlandı Mı?
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Atayan Kişi
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           İşlem
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    //         <th
    //           scope="row"
    //           className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //         >
    //           Apple MacBook Pro 17
    //         </th>
    //         <td className="px-6 py-4">Silver</td>
    //         <td className="px-6 py-4">Laptop</td>
    //         <td className="px-6 py-4">$2999</td>
    //       </tr>
    //       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    //         <th
    //           scope="row"
    //           className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //         >
    //           Microsoft Surface Pro
    //         </th>
    //         <td className="px-6 py-4">White</td>
    //         <td className="px-6 py-4">Laptop PC</td>
    //         <td className="px-6 py-4">$1999</td>
    //       </tr>
    //       <tr className="bg-white dark:bg-gray-800">
    //         <th
    //           scope="row"
    //           className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //         >
    //           Magic Mouse 2
    //         </th>
    //         <td className="px-6 py-4">Black</td>
    //         <td className="px-6 py-4">Accessories</td>
    //         <td className="px-6 py-4">$99</td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>

    <>
      <div className="grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3">
      
        
        {/* card container */}
        <div className="rounded-xl col-span-1 border-black min-w-[200px] max-w-[400px] h-[500px] shadow-xl">
          <div className="">
            <div className="flex justify-center items-center  rounded-tl-xl p-3 h-[200px] rounded-tr-xl bg-gradient-to-r from-indigo-500 to-blue-500">
              <div>

              
              <Image
              
                className="rounded-xl border-[1px] border-black  "
                src={"/onurtosunprofile.jpeg"}
                height={150}
                width={150}
                alt="onur-tosun"
              />
              </div>
            </div>
            <div className="w-full">
              <div className="w-full  flex flex-col p-3">
                <h3 className="font-bold text-2xl">Onur TOSUN</h3>
                <p className="flex text-sm items-center">@onr <Dot /> Haziran 2024 </p>
                <div className="w-full py-3 ">
                  <div className="border-[1px] bg-black"></div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
        {/* card container */}
        <div className="rounded-xl col-span-1  border-black min-w-[200px] max-w-[400px]  shadow-xl">
          <div className="">
            <div className="flex justify-center items-center  rounded-tl-xl p-3 h-[200px] rounded-tr-xl bg-gradient-to-r from-indigo-500 to-blue-500">
              <div>

              
              <Image
              
                className="rounded-xl border-[1px] border-black  "
                src={"/onurtosunprofile.jpeg"}
                height={150}
                width={150}
                alt="onur-tosun"
              />
              </div>
            </div>
            <div className="w-full">
              <div className="w-full  flex flex-col p-3">
                <h3 className="font-bold text-2xl">Onur TOSUN</h3>
                <p className="flex text-sm items-center">@onr <Dot /> Haziran 2024 </p>
                <div className="w-full py-3 ">
                  <div className="border-[1px] bg-black"></div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
        {/* card container */}
        <div className="rounded-xl col-span-1  border-black min-w-[200px] max-w-[400px]  shadow-xl">
          <div className="">
            <div className="flex justify-center items-center  rounded-tl-xl p-3 h-[200px] rounded-tr-xl bg-gradient-to-r from-indigo-500 to-blue-500">
              <div>

              
              <Image
              
                className="rounded-xl border-[1px] border-black  "
                src={"/onurtosunprofile.jpeg"}
                height={150}
                width={150}
                alt="onur-tosun"
              />
              </div>
            </div>
            <div className="w-full">
              <div className="w-full  flex flex-col p-3">
                <h3 className="font-bold text-2xl">Onur TOSUN</h3>
                <p className="flex text-sm items-center">@onr <Dot /> Haziran 2024 </p>
                <div className="w-full py-3 ">
                  <div className="border-[1px] bg-black"></div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
        
        
        
        
      </div>

     
    </>
  );
};

export default TeamCards;
