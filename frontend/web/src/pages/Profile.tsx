import { signOut, useSession } from "@/lib/auth-client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { data, error, isPending } = useSession();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast(ctx.error.message || ctx.error.statusText);
        },
      },
    });

    // it will automatically change the route!
  };

  if (isPending) {
    return "...";
  }

  if (error) {
    toast(error.message || error.statusText);
  }

  return (
    <div>
      <h1>Profile</h1>
      <Button onClick={handleLogout} variant={"destructive"}>
        logout
      </Button>

      <div className="flex flex-col p-6 gap-4">
        <span>Name: {data?.user.name}</span>
        <span>Email: {data?.user.email}</span>
        <span>
          Verified:{" "}
          {data?.user.emailVerified ||
            "no email verification method implemented".toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default Profile;
