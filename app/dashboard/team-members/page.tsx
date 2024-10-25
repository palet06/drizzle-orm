import React from "react";

import TeamCards from "./_components/TeamCards";
//import { db } from "@/configs/db/db";
import { eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";

import { user, project, projectToUser } from "@/configs/db/schema";

const getTeamMembers = async () => {
  const members = await global.db!.query.user.findMany({
    with: {
      tasks: true,
      projectToUser: {
        with: {
          project: true,
        },
      },
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
              isDone: true,
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
const getUserProjects = async () => {
  const userProjects = await global
    .db!.selectDistinct({
      GuserId: user.userId,
      username: user.username,
      GprojectId: project.projectId,
      projectName: project.projectName,
    })
    .from(projectToUser)
    .innerJoin(user, eq(user.userId, projectToUser.userId))
    .innerJoin(project, eq(project.projectId, projectToUser.projectId));

  return userProjects;
};

export type teamMemberSelectType = Awaited<ReturnType<typeof getTeamMembers>>;
export type userProjectsSelectType = Awaited<
  ReturnType<typeof getUserProjects>
>;

const TeamMembers = async () => {
  const membersList = await getTeamMembers();
  const userProjects = await getUserProjects();
  console.log(userProjects);

  revalidatePath("/", "layout");

  return <TeamCards membersList={membersList} userProjects={userProjects} />;
};

export default TeamMembers;
