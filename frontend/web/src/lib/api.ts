import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

type Chat = {
  id: number;
  name: string;
  created_at: Date;
  user_id: string;
};

export async function getChats(): Promise<Chat[]> {
  return api.get("/chat").then((res) => res.data);
}
