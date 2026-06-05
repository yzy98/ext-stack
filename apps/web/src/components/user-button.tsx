import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ext-stack/ui/components/avatar";
import { Button } from "@ext-stack/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ext-stack/ui/components/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface UserButtonProps {
  user: NonNullable<ReturnType<typeof authClient.useSession>["data"]>["user"];
}

export const UserButton = ({ user }: UserButtonProps) => {
  const { name, image, email } = user;
  const fallback = name.at(0)?.toUpperCase() ?? "U";

  const navigate = useNavigate();

  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/" });
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="rounded-full" size="icon" variant="ghost">
            <Avatar>
              {image ? <AvatarImage alt={name} src={image} /> : null}
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Open user menu</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-50 overflow-hidden p-0">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar>
            {image ? <AvatarImage alt={name} src={image} /> : null}
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-medium text-sm">{name}</p>
            <p className="truncate text-muted-foreground text-sm">{email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })}>
            <LayoutDashboardIcon />
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogOut} variant="destructive">
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
