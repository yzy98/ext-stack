import { createFileRoute, redirect } from "@tanstack/react-router";
import { ServerHealth } from "@/components/server-health";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_app/dashboard")({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();
    if (!session) {
      throw redirect({
        to: "/sign-in",
      });
    }
  },
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          API status and workspace setup.
        </p>
      </div>
      <ServerHealth />
    </div>
  );
}
