import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetcher = async () => {
  const res = await axios.get("http://localhost:3000/api/hello");

  return res.data;
};

export function ChatSidebar() {
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["chats"],
    queryFn: fetcher,
  });

  if (isPending) {
    return "...";
  }

  if (isError) {
    return error.message;
  }

  console.log(data);

  return <div className="h-full w-[25%]">side</div>;
}
