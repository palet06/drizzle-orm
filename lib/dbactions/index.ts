import {
  assignedTask,
  project,
  projectToUser,
  user,
} from "@/configs/db/schema";

import { eq } from "drizzle-orm";
import { db } from "@/configs/db/db";

export const getAssignedTasks = async (id: number) => {
  const data = await db.query.assignedTask.findMany({
    with: {
      assignee: {
        columns: {
          userId: true,
          profilePictureUrl: true,
          name: true,
          surname: true,
        },
      },
      executive: {
        columns: {
          userId: true,
          name: true,
          surname: true,
        },
      },
      task: {
        columns: {
          description: false,
        },
      },
    },
    where: (assignedTask, { eq }) => eq(assignedTask.assigneeId, id),
  });
  return data;
};

export const getAssignedTaskById = async (id: number) => {
  const data = await db.query.assignedTask.findFirst({
    with: {
      assignee: {
        columns: {
          userId: true,
          profilePictureUrl: true,
          name: true,
          surname: true,
        },
      },
      executive: {
        columns: {
          userId: true,
          name: true,
          surname: true,
        },
      },
      task: {
        columns: {
          description: false,
        },
      },
    },
    where: (assignedTask, { eq }) => eq(assignedTask.assigneeId, id),
  });
  return data;
};

export type assignedTaskListType = Awaited<ReturnType<typeof getAssignedTasks>>;
export type assignedTaskListTypeById = Awaited<
  ReturnType<typeof getAssignedTaskById>
>;

export const getTeamMembers = async () => {
  const members = await db.query.user.findMany({
    columns: {
      password: false,
    },
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
              password: false,
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

export const getTeamMembersWithId = async (id: number) => {
  const member = await db.query.user.findFirst({
    columns: {
      password: false,
    },
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
              password: false,
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
    where: (user, { eq, and }) =>
      and(eq(user.userId, id), eq(user.isTeamMember, true)),
  });

  return member;
};

export type teamMemberSelectType = Awaited<ReturnType<typeof getTeamMembers>>;
export type teamMemberWithIdSelectType = Awaited<
  ReturnType<typeof getTeamMembersWithId>
>;

export const getUserProjects = async () => {
  const userProjects = await db
    .selectDistinct({
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

export type userProjectsSelectType = Awaited<
  ReturnType<typeof getUserProjects>
>;

export const assignTaskToMember = async (
  taskId: number,
  assigneeId: number,
  executiveId: number,
  projectId: number
) => {
  const added = await db.insert(assignedTask).values({
    taskId: taskId,
    assigneeId: assigneeId,
    executiveId: executiveId,
    projectId: projectId,
  });

  return added;
};

export const getAllProjects = async () => {
  const res = db.query.project.findMany();
  return res;
};
export type getAllProjectsType = Awaited<ReturnType<typeof getAllProjects>>;

export const getAllTaskList = async () => {
  const res = db.query.assignedTask.findMany();
  return res;
};

export type getAllTaskListType = Awaited<ReturnType<typeof getAllTaskList>>;
