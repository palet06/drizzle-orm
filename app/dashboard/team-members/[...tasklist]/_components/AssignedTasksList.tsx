"use client"
 
import {
  
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { assignedTaskListType, assignedTaskListTypeById } from "@/lib/dbactions"
import ActionTableButton from "./ActionTableButton"
const columnHelper = createColumnHelper<assignedTaskListTypeById>()
const columns=[
  columnHelper.accessor("task.title",{
   header:"Görev"
  }),
  columnHelper.accessor(row => `${row?.executive.name} ${row?.executive.surname}`,{
    header:"Atayan",
    
  }),
  columnHelper.accessor("task.createdDate",{
   header:"Atama Tarihi",
   cell:(c)=>c.cell.getValue()?.toLocaleDateString("tr-TR")
   
  }),
  columnHelper.accessor("task.status",{
    header:"Durum"
  }),
  columnHelper.accessor("task.priority",{
    header:"Öncelik"
  }),
  columnHelper.accessor("task.isDone",{
    header:"Tamamlandı Mı?",
    cell:(c)=>c.cell.getValue()==true?"Evet":"Hayır"
  }),
  columnHelper.accessor(row => `${row?.task.taskId} ${row?.assigneeId}`,{
    header: "İşlem",
    cell: props => <ActionTableButton taskId={props.row.original!.taskId} asigneeId={props.row.original!.assigneeId} />,
  }),

  
 ]








 
export function AssignedTasksList({tasklists}:{tasklists:assignedTaskListType}) {
 
  const table = useReactTable({
    data:tasklists,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

 
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}


export default AssignedTasksList