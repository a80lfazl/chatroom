import { useQuery } from "@tanstack/react-query";

import { getChats } from "@/lib/api";

export function ChatSidebar() {
  const {
    data: chats,
    error,
    status,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });

  if (status === "pending") {
    return "...";
  } else if (status === "error") {
    return error.message;
  }

  return (
    <div className="h-full w-[25%]">
      {(chats.length &&
        chats.map(({ id, name }) => <div key={id}>{name}</div>)) ||
        "no chats"}
    </div>
  );
}
