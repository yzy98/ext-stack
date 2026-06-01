import { Button } from "@ext-stack/ui/components/button";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

type HealthState =
  | {
      status: "idle" | "loading";
      message: string;
    }
  | {
      status: "online";
      message: string;
      service: string;
    }
  | {
      status: "offline";
      message: string;
    };

export function ServerHealth() {
  const [health, setHealth] = useState<HealthState>({
    status: "idle",
    message: "Server health has not been checked.",
  });

  const checkHealth = useCallback(async () => {
    setHealth({
      status: "loading",
      message: "Checking server health...",
    });

    try {
      const response = await apiClient.health.$get();

      if (!response.ok) {
        setHealth({
          status: "offline",
          message: `Server returned ${response.status}.`,
        });
        return;
      }

      const data = await response.json();

      setHealth({
        status: "online",
        message: "Server is online.",
        service: data.service,
      });
    } catch (error) {
      setHealth({
        status: "offline",
        message:
          error instanceof Error
            ? error.message
            : "Unable to reach the server.",
      });
    }
  }, []);

  useEffect(() => {
    checkHealth().catch((error: unknown) => {
      setHealth({
        status: "offline",
        message:
          error instanceof Error
            ? error.message
            : "Unable to reach the server.",
      });
    });
  }, [checkHealth]);

  const statusClassName = {
    idle: "bg-muted text-muted-foreground",
    loading: "bg-muted text-muted-foreground",
    online: "bg-emerald-500 text-white",
    offline: "bg-destructive text-destructive-foreground",
  }[health.status];

  return (
    <section className="mx-auto flex max-w-md flex-col gap-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-medium text-base">Server health</h2>
          <p className="text-muted-foreground text-sm">{health.message}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 font-medium text-xs ${statusClassName}`}
        >
          {health.status}
        </span>
      </div>

      {health.status === "online" ? (
        <p className="text-muted-foreground text-sm">
          Service: {health.service}
        </p>
      ) : null}

      <Button
        disabled={health.status === "loading"}
        onClick={() => {
          checkHealth().catch((error: unknown) => {
            setHealth({
              status: "offline",
              message:
                error instanceof Error
                  ? error.message
                  : "Unable to reach the server.",
            });
          });
        }}
        type="button"
        variant="outline"
      >
        Check again
      </Button>
    </section>
  );
}
