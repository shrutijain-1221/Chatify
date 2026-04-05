import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    
  } = useChatStore();
const {onlineUsers}=useAuthStore()
 


  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Users list */}
      <div className="overflow-y-auto w-full py-3 space-y-1">
        {users?.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-base-200 transition-colors ${
              selectedUser?._id === user._id ? "bg-base-200" : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-10 object-cover rounded-full"
              />

              {/* Online dot (optional) */}
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-2 bg-green-500 rounded-full ring-2 ring-base-100" />
              )}
            </div>

            {/* Name */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">
                {user.fullName}
              </div>
              <div className="text-sm text-base-content/60">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;