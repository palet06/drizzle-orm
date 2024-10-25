import React from "react";
import ProjectCards from "./_components/ProjectCards";
//import db from "@/configs/db/db";
import { revalidatePath } from "next/cache";
import { ProjectTableFieldsTypes } from "@/configs/db/schema";

const getProjects = async () => {
  const result = await global.db!.query.project.findMany({
    with: {
      assignedTasks: {
        with: {
          assignee: {
            columns: {
              name: true,
              surname: true,
            },
          },
        },
      },
    },
  });
  return result as ProjectTableFieldsTypes[];
};

const Projects = async () => {
  const projects = await getProjects();
  revalidatePath("/", "layout");
  return (
    <div>
      <ProjectCards projects={projects} />
    </div>
  );
};

export default Projects;
