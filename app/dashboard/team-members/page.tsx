import React from "react";

import TeamCards from "./_components/TeamCards";
import { db } from "@/configs/db/db";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { users } from "@/configs/db/schema";

export type Team = {
  id: number; // 'serial' primary key
  userName: string; // 'varchar' (not null)
  email: string; // 'varchar' (not null)
  phone: string | null; // 'varchar' (not null)
  password: string; // 'varchar' (not null)
  profilePictureUrl?: string | null; // 'varchar' (nullable)
  isAdmin: boolean | null; // 'boolean' with default value
  isTeamMember: boolean | null; // 'boolean' with default value
  role?: string | null; // 'varchar' (nullable)
  createdDate: Date | null; // 'timestamp' with default value
  updatedDate: Date | null; // 'timestamp' with default value
  tasks: {
    assigneeId:number;
    createdDate:Date |null;
    updatedDate:Date | null;
    id:number;
    taskId:number | null;    
    userId:number | null;
    
  }[];
  projects:{
    userId:number |null;
    projectId:number | null;
  }[];
};

const getTeamMembers = async () => {
  const members = await db.query.users.findMany({
    with: { tasks: true, projects: true },
    where:eq(users.isTeamMember, true)
  });

  return members;
};

const TeamMembers = async () => {
  const membersList = await getTeamMembers();
  
  revalidatePath("/", "layout");

  return (
    <div>
      <TeamCards membersList={membersList} />
    </div>
  );
};

export default TeamMembers;
