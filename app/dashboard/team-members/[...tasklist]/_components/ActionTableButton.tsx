import {
  ArrowLeftRight,
  CheckCheck,  
  ReceiptText,
  UserMinus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ActionTableButton({taskId,asigneeId}:{taskId:number,asigneeId:number}) {
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
        <Link href={`task-details/${taskId}`} >
          <DropdownMenuItem>
            <ReceiptText />
            <span>Ayrıntılar</span>
          </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <UserMinus />
            <span>
              Atamayı Kaldır</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowLeftRight />
            <span>Transfer Et</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CheckCheck />
            <span className="font-bold">Tamamlandı</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionTableButton;
