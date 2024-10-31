import ActionTableButton from "@/app/dashboard/team-members/[tasklist]/_components/ActionTableButton";
import { Button } from "@/components/ui/button";
import { assignedTaskListTypeById } from "@/lib/dbactions";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const columnHelper = createColumnHelper<assignedTaskListTypeById>();
const columns = [
  columnHelper.accessor("task.title", {
    id: "Görev",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Görev
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor(
    (row) => `${row?.executive.name} ${row?.executive.surname}`,

    {
      id: "Atayan",
      header: "Atayan",
    }
  ),
  columnHelper.accessor("createdDate", {
    id: "Atama Tarihi",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Atama Tarihi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (c) => c.cell.getValue()?.toLocaleDateString("tr-TR"),
  }),
  columnHelper.accessor("task.status", {
    id: "Durum",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Durum
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("task.priority", {
    id: "Öncelik",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Öncelik
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("task.isDone", {
    id: "Tamamlandı Mı?",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tamamlandı Mı?
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (c) => (c.cell.getValue() == true ? "Evet" : "Hayır"),
  }),
  columnHelper.accessor((row) => `${row?.task.taskId} ${row?.assigneeId}`, {
    header: "İşlem",
    enableHiding: false,
    cell: (props) => (
      <ActionTableButton
        taskId={props.row.original!.taskId}
        asigneeId={props.row.original!.assigneeId}
      />
    ),
  }),
];

export { columns };
