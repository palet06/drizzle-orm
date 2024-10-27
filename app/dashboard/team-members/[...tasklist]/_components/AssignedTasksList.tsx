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
          <TableHead>Durum</TableHead>
          <TableHead>Öncelik</TableHead>
          <TableHead className="text-right">Atama Tarihi</TableHead>
          <TableHead className="text-right">Atayan Kişi</TableHead>
          <TableHead className="text-right">Tamamlandı Mı?</TableHead>
          <TableHead className="text-right">İşlem</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasklists?.map((task) => (
          <TableRow  key={task.taskId}>
            <TableCell 
            data-twe-toggle="tooltip"
    
    data-tip="Some content inside the popover1"
              
            >
              {task.task.title}
            </TableCell>
            <TableCell>{task.task.status}</TableCell>
            <TableCell>{task.task.priority}</TableCell>
            <TableCell className="text-right">
              {task.createdDate?.toLocaleDateString("tr-TR")}
            </TableCell>
            <TableCell className="text-right">
              {task.executive.name} {task.executive.surname}
            </TableCell>
            <TableCell className="text-right">
              {task.task.isDone ? "Evet" : "Hayır"}
            </TableCell>
            <TableCell className="text-right">
              <ActionTableButton />
            </TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AssignedTasksList;
