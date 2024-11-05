import { db } from "@/configs/db/db";
import React from "react";
import TasksList from "./_components/TasksList";
//import {Task} from "@/configs/db/schema"
import { revalidatePath } from "next/cache";
import { SelectTasks } from "@/configs/db/schema";

const getTasks = async () => {
  //const allProjects = await db.select().from(projects);

  const getAllTasks = await db.query.tasks.findMany({
    with: {
      assignedTasks: true,
      attachments: true,
      comments: true,
      project: true,
    },
  });
  return getAllTasks as SelectTasks[];
};

const Tasks = async () => {
  const tasksList = await getTasks();
  revalidatePath("/", "layout");
  return <TasksList tasksList={tasksList} />;
};

export default Tasks;
