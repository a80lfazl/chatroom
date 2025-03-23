import { useQuery } from "@tanstack/react-query";

import { getChats } from "@/lib/api";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ChatDialog } from "./ChatDialog";

export function ChatSidebar() {
  const { data, error, status } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });

  if (status === "pending") {
    return "...";
  } else if (status === "error") {
    return error.message;
  }

  return (
    <div className="h-full w-[25%] flex flex-col">
      <div className="flex-1">
        {data.chats.map(({ id, name }) => (
          <div key={id}>{name}</div>
        ))}
      </div>

      <ChatDialog friends={[]}>
        <Button className="rounded-full">
          <Plus />
        </Button>
      </ChatDialog>
    </div>
  );
}
