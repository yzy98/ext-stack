import { buttonVariants } from "@ext-stack/ui/components/button";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();
    if (session) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center">
      <Link
        className={buttonVariants({
          className: "absolute top-0 left-0",
          size: "icon",
          variant: "ghost",
        })}
        to="/"
      >
        <ChevronLeftIcon />
        <span className="sr-only">Back to home</span>
      </Link>
      <Outlet />
    </div>
  );
}
