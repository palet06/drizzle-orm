"use client"
 

import React from "react";


import { Team } from "../page";



const TeamCards = ({membersList}: {membersList:Team[]}) => {
 
  return (
    <div className="flex flex-col justify-between w-36 h-[250px] border border-black">
      {
        membersList.map((item, index:number) => (
          <>
            
            <div key={index} className="flex flex-col justify-between">
              <h2 className="text-bold text-xl text-violet-600">{item.userName}</h2>
              <p>{item.email}</p>
             
            </div>
          </>
        )
      )}
    </div>
  );
};

export default TeamCards;
