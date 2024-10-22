"use client";

import { ProjectTableFieldsTypes } from "@/configs/db/schema";
import React from "react";

const ProjectCards = ({
  projects,
}: {
  projects: ProjectTableFieldsTypes[];
}) => {
  return (
    <>
      {projects.map((project, index) => (
        <ul key={index} className="flex gap-3">
          <li>{project.projectName}</li>
          <li>
            {project.assignedTasks?.map((k, l) => (
              <p key={l}>
                {k.assignee.name} {k.assignee.surname}
              </p>
            ))}
          </li>
        </ul>
      ))}
    </>
  );
};

export default ProjectCards;
