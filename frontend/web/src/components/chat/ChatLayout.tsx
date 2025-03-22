import { Outlet } from "react-router";

import { Separator } from "@/components/ui/separator";

import { ChatSidebar } from "./ChatSidebar";

const ChatLayout = () => {
  return (
    <div className="w-full h-full flex p-4 gap-2">
      <ChatSidebar />

      <Separator orientation="vertical" />

      <Outlet />
    </div>
  );
};

export default ChatLayout;
