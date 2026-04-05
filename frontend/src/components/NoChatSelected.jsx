import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-base-100 text-base-content px-4">
      
      {/* Icon */}
      <div className="bg-primary/10 p-5 rounded-full mb-4">
        <MessageSquare className="size-10 text-primary" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">
        No Chat Selected
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-base-content/70 text-center max-w-sm">
        Select a conversation from the sidebar to start chatting or begin a new one.
      </p>

    </div>
  );
};

export default NoChatSelected;