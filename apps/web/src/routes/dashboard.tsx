import { createFileRoute } from "@tanstack/react-router";
import { ServerHealth } from "@/components/server-health";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
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
