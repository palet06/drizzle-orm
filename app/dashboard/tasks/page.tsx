import { db } from "@/configs/db/db";
import React from "react";
import TasksList from "./_components/TasksList";
//import {Task} from "@/configs/db/schema"
import { revalidatePath } from "next/cache";

const Tasks = async () => {
  revalidatePath("/", "layout");
  return <TasksList />;
};

export default Tasks;
