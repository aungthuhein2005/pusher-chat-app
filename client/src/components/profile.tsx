import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChartNoAxesCombined, LogOut, Mail, Settings, User, User2 } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
 

  useEffect(() => {
    // axios.get('/api/profile',{
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }     
    // })
    // .then(data => {
    //   setUser(data.data)
    //   setLoading(false)
    // })
    // .catch(err => console.log(err))
    }
    ,[])

    return (
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User2/> Name : {currentUser.name}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mail/> Email : {currentUser.email}
          </DropdownMenuItem>
         
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings/> Setting
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut/> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
    
}