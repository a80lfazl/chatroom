import { Route, Routes } from "react-router";

import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { GuestRoute } from "./components/routing/GuestRoute";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ChatLayout from "./components/chat/ChatLayout";
import Chat from "./components/chat/Chat";
import NoChat from "./components/chat/NoChat";

function App() {
  return (
    <Routes>
      <Route index element={<div>Home</div>} />

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route element={<ChatLayout />}>
          <Route path="/chat" element={<NoChat />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
