import { Route, Routes } from "react-router";

import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { GuestRoute } from "./components/routing/GuestRoute";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

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
      </Route>
    </Routes>
  );
}

export default App;
