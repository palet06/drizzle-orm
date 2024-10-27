import React from "react";
import TeamCards from "./_components/TeamCards";

import { revalidatePath } from "next/cache";

import { getTeamMembers, getUserProjects } from "@/lib/dbactions/index";

const TeamMembers = async () => {
  const membersList = await getTeamMembers();
  const userProjects = await getUserProjects();

  revalidatePath("/", "layout");

  return <TeamCards membersList={membersList} userProjects={userProjects} />;
};

export default TeamMembers;
