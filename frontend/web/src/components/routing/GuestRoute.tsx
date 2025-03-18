import { Outlet, useNavigate } from "react-router";

import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";

export const GuestRoute = () => {
  const { data, error, isPending } = useSession();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  });

  // TODO: handle loading properly
  if (isPending) {
    return "loading";
  }

  // TODO: handle error properly
  if (error) {
    throw new Error(error.message);
  }

  return <Outlet />;
};
