import { getAssignedTasks, getTeamMembersWithId } from "@/lib/dbactions";

import React from "react";
import TeamHeader from "../_components/TeamHeader";

const TaskListLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: {tasklist:number[]};
}) => {
  const teamMember = await getTeamMembersWithId(params.tasklist[0]);
  const tasklists = await getAssignedTasks(params.tasklist[0]);

  return (
    <>
      <div className=" bg-white">
        <TeamHeader teamMember={teamMember} tasklists={tasklists} />
      </div>
      <div className="bg-white">{children}</div>
    </>
  );
};

export default TaskListLayout;
