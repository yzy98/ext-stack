import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BackButton } from "@/components/back-button";
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
      <BackButton className="absolute top-0 left-0" />
      <Outlet />
    </div>
  );
}
