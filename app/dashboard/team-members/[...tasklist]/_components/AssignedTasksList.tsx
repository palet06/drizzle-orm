"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ActionTableButton from "./ActionTableButton";
import { assignedTaskListType } from "@/lib/dbactions/index";
import { Tooltip as ReactTooltip } from "react-tooltip";

export function AssignedTasksList({
  tasklists,
}: {
  tasklists: assignedTaskListType;
}) {
  return (
    <Table>
      <TableCaption>Atanan Görev Listesi</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Görev</TableHead>
          <TableHead className="text-center">Durum</TableHead>
          <TableHead className="text-center">Öncelik</TableHead>
          <TableHead className="text-center">Atama Tarihi</TableHead>
          <TableHead className="text-center">Atayan Kişi</TableHead>
          <TableHead className="text-center">Tamamlandı Mı?</TableHead>
          <TableHead className="text-center">İşlem</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasklists?.map((task) => (
          <TableRow key={task.taskId}>
            <TableCell >
              

              <div className=" line-clamp-2 w-60" data-tooltip-id={`my-tooltip-${task.taskId}`}>
                {task.task.title}
              </div>
              
                  
           
              <ReactTooltip
                id={`my-tooltip-${task.taskId}`}
                place="top"
                content={task.task.title}
              />
            </TableCell>
            <TableCell className="text-center">{task.task.status}</TableCell>
            <TableCell className="text-center">{task.task.priority}</TableCell>
            <TableCell className="text-center">
              {task.createdDate?.toLocaleDateString("tr-TR")}
            </TableCell>
            <TableCell className="text-center">
              {task.executive.name} {task.executive.surname}
            </TableCell>
            <TableCell className="text-center">
              {task.task.isDone ? "Evet" : "Hayır"}
            </TableCell>
            <TableCell className="text-center">
              <ActionTableButton />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AssignedTasksList;
