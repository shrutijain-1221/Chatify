import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="w-64 h-full bg-base-100 border-r border-base-300 p-4 space-y-4">
      
      {/* Header skeleton */}
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-10 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-3 w-16"></div>
        </div>
      </div>

      {/* Chat list skeleton */}
      <div className="space-y-3 mt-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="skeleton h-10 w-10 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-3 w-20"></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SidebarSkeleton;