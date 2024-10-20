import React from "react";

import ExecutivesCards from "./_components/ExecutivesCards";
//import { db } from "@/configs/db/db";

import { revalidatePath } from "next/cache";

//export type ddv = typeof db._.fullSchema.users.$inferSelect;




const Executives = async () => {
 
  revalidatePath('/', 'layout')

  return (
    <div>
      <ExecutivesCards />
    </div>
  );
};

export default Executives;
