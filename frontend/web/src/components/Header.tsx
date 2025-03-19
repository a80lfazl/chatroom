import { signOut, useSession } from "@/lib/auth-client";
import { Link, NavLink } from "react-router";
import type { ReactNode } from "react";

import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./theme/ThemeToggle";

const Header = () => {
  const { isPending, data } = useSession();

  return (
    <header className="w-full flex items-center justify-between">
      <NavLink to={"/"}>
        <h1 className="text-3xl">Your School</h1>
      </NavLink>
      <div className="flex items-center gap-3">
        <nav className="flex gap-4">
          <NavLink to="/">Home</NavLink>
        </nav>

        {isPending ? (
          "..."
        ) : data ? (
          <DropdownMenuPanel />
        ) : (
          <DropdownMenuNewUser />
        )}
      </div>
    </header>
  );
};

function DropdownMenuLayout({
  children,
  triggerContent,
}: {
  children: ReactNode;
  triggerContent: ReactNode | string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{triggerContent}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {children}

        <DropdownMenuSeparator />

        <ModeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropdownMenuPanel() {
  return (
    <DropdownMenuLayout triggerContent={<Menu />}>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <Link to={"/profile"}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuLabel>Groups & Classes</DropdownMenuLabel>
        <Link to={"/dashboard"}>
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Classes</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <Link to={"/classes"}>
                <DropdownMenuItem>Manage</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Invite Students</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Join Class</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuLabel>Me Part ***</DropdownMenuLabel>
        <DropdownMenuItem disabled>Contact Us</DropdownMenuItem>
        <DropdownMenuItem disabled>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={() => signOut()}>logout</DropdownMenuItem>
    </DropdownMenuLayout>
  );
}

function DropdownMenuNewUser() {
  return (
    <DropdownMenuLayout triggerContent={"New User"}>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <Link to={"/login"}>
          <DropdownMenuItem>Login</DropdownMenuItem>
        </Link>

        <Link to={"/signup"}>
          <DropdownMenuItem>Sign Up</DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
    </DropdownMenuLayout>
  );
}

export default Header;
