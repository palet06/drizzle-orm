import { getAssignedTasks } from "@/lib/dbactions";
import AssignedTasksList from "./_components/AssignedTasksList";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TaskList = async ({ params }: { params: any }) => {
  const tasklists = await getAssignedTasks(params.tasklist[0]);

  return (
    <>
      <AssignedTasksList tasklists={tasklists} />
    </>
  );
};

export default TaskList;
