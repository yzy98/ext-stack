import { UserMenuButton } from "@ext-stack/ui/components/user-menu-button";
import { useNavigate } from "@tanstack/react-router";
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface UserButtonProps {
  user: NonNullable<ReturnType<typeof authClient.useSession>["data"]>["user"];
}

export const UserButton = ({ user }: UserButtonProps) => {
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
    <UserMenuButton
      items={[
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboardIcon,
          onSelect: () => navigate({ to: "/dashboard" }),
        },
        {
          id: "logout",
          label: "Log out",
          icon: LogOutIcon,
          variant: "destructive",
          onSelect: handleLogOut,
        },
      ]}
      user={{
        name: user.name,
        email: user.email,
        image: user.image,
      }}
    />
  );
};
