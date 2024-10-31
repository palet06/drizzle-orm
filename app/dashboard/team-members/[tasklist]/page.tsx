import {
  getAllProjects,
  getAllTaskList,
  getAssignedTasks,
} from "@/lib/dbactions";
import AssignedTasksList from "./_components/AssignedTasksList";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TaskList = async ({ params }: { params: any }) => {
  const tasklists = await getAssignedTasks(params.tasklist[0]);
  const allTaskList = await getAllTaskList();
  const allProjects = await getAllProjects();

  return (
    <>
      <AssignedTasksList
        tasklists={tasklists}
        allTaskList={allTaskList}
        allProjects={allProjects}
        teamMemberUserId={params.tasklist[0]}
      />
    </>
  );
};

export default TaskList;
