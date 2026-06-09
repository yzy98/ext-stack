import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FileCodeIcon, GitBranchIcon, PlugZapIcon } from "lucide-react";
import { apiClient } from "@/lib/api-client";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
});

async function getServerHealth() {
  const response = await apiClient.health.$get();

  if (!response.ok) {
    throw new Error(`Server returned ${response.status}.`);
  }

  return response.json();
}

function getApiStatus({
  isError,
  isLoading,
}: {
  isError: boolean;
  isLoading: boolean;
}) {
  if (isLoading) {
    return {
      description: "Checking server health...",
      indicatorClassName: "bg-muted-foreground",
    };
  }

  if (isError) {
    return {
      description: "Server API is not reachable.",
      indicatorClassName: "bg-destructive",
    };
  }

  return {
    description: "Server health is online.",
    indicatorClassName: "bg-emerald-500",
  };
}

const staticStarterSteps = [
  {
    title: "Edit popup UI",
    description: "apps/extension/src/routes/_app/index.tsx",
    icon: FileCodeIcon,
  },
  {
    title: "Add routes",
    description: "apps/extension/src/routes",
    icon: GitBranchIcon,
  },
];

function HomePage() {
  const { isError, isLoading } = useQuery({
    queryKey: ["server-health"],
    queryFn: getServerHealth,
  });
  const apiStatus = getApiStatus({ isError, isLoading });

  return (
    <div className="flex flex-1 flex-col gap-5">
      <section className="flex items-start gap-3">
        <p className="text-muted-foreground text-sm leading-5">
          Start by editing this route. Router and API wiring are already in
          place.
        </p>
      </section>

      <section className="grid gap-2">
        {staticStarterSteps.map((item) => (
          <div
            className="flex items-center gap-3 rounded-md border bg-card px-3 py-2"
            key={item.title}
          >
            <item.icon className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="font-medium text-sm">{item.title}</p>
              <p className="truncate text-muted-foreground text-xs">
                {item.description}
              </p>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3 rounded-md border bg-card px-3 py-2">
          <PlugZapIcon className="size-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm">Check API</p>
            <p className="truncate text-muted-foreground text-xs">
              {apiStatus.description}
            </p>
          </div>
          <span
            className={`size-2 shrink-0 rounded-full ${apiStatus.indicatorClassName}`}
          />
        </div>
      </section>
    </div>
  );
}
