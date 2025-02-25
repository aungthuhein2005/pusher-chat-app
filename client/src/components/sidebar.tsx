import { useUser } from "@/context/UserContext";
import axios from "axios";
import { User } from "lucide-react"
import { useEffect, useState } from "react"

// const users = [
//   { id: 1, name: "Alice Johnson" },
//   { id: 2, name: "Bob Smith" },
//   { id: 3, name: "Charlie Brown" },
//   { id: 4, name: "Diana Miller" },
//   { id: 5, name: "Ethan Davis" },
// ]


export function Sidebar() {

  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const { selectedUser, setSelectedUser } = useUser();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    axios.get('/api/users',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(data => {
      setUsers(data.data)
      
    })
    .catch(err => console.log(err))
  }
  ,[])

  // useEffect(() => {
  //   if (selectedUser) {
  //     axios.get(`/api/fetch-messages/${selectedUser.id}`)
  //     .then(data => {
  //      set
  //     })
  //     .catch(err => console.log(err))
  //   }
  // },[selectedUser])

  return (
    <aside className="w-64 bg-gray-100 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <ul className="space-y-2">

          {users ? users.length > 0 ? users.map((user) => (
            <li
              key={user.id}
              className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${selectedUser?.id === user.id ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
              onClick={() => setSelectedUser(user)}
            >
              <User className="h-6 w-6" />
              <span>{user.name}</span>
              {/* {user.role === 'admin' ? <p>Admin</p> : <p>User</p>} */}
            </li>
          )) : <p>No users</p> : <p>Loading...</p>}
        </ul>
      </div>
    </aside>
  )
}

