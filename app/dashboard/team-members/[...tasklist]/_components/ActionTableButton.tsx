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

export function ActionTableButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ReceiptText />
            <span>Ayrıntılar</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserMinus />
            <span>Atamayı Kaldır</span>
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
