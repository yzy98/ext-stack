/** biome-ignore-all lint/style/noNestedTernary: ignore */

import { buttonVariants } from "@ext-stack/ui/components/button";
import { UserMenuButton } from "@ext-stack/ui/components/user-menu-button";
import { Link, useNavigate } from "@tanstack/react-router";
import { ExternalLinkIcon, LogOutIcon } from "lucide-react";
import { browser } from "#imports";
import { authClient } from "@/lib/auth-client";
import { ModeToggle } from "./mode-toggle";

export const PopupTopBar = () => {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  const webUrl = import.meta.env.WXT_WEB_URL ?? "http://localhost:5173";

  const handleOpenDashboard = async () => {
    await browser.tabs.create({
      url: `${webUrl}/dashboard`,
    });
  };

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
    <header className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate font-semibold text-sm">ExtStack</p>
        <p className="truncate text-muted-foreground text-xs">Extension</p>
      </div>

      <div className="flex items-center gap-1">
        {isPending ? null : session ? (
          <UserMenuButton
            items={[
              {
                id: "open-dashboard",
                label: "Open dashboard",
                icon: ExternalLinkIcon,
                onSelect: handleOpenDashboard,
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
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }}
          />
        ) : (
          <Link
            activeProps={{
              className: buttonVariants({ size: "sm", variant: "secondary" }),
            }}
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
            to="/sign-in"
          >
            Sign in
          </Link>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};
