import React from "react";

import TeamCards from "./_components/TeamCards";
import db from "@/configs/db/db";

import { revalidatePath } from "next/cache";

const getTeamMembers = async () => {
  const members = await db.query.user.findMany({
    with: {
      tasks: true,
      projectToUser: true,
      comments: true,
      assignedTasks: {
        with: {
          assignee: {
            columns: {
              isExecutive: false,
              isTeamMember: false,
              password: false,
            },
          },
          executive: {
            columns: {
              userId: true,
              name: true,
              surname: true,
            },
          },
          project: {
            columns: {
              projectId: true,
              projectName: true,
            },
          },
          task: {
            columns: {
              taskId: true,
              title: true,
              status: true,
              priority: true,
            },
          },
        },
      },
      userRoles: true,
    },
    where: (user, { eq }) => eq(user.isTeamMember, true),
  });

  return members;
};

export type teamMemberSelectType = Awaited<ReturnType<typeof getTeamMembers>>;

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
