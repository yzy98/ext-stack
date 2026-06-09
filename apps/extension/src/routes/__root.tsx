import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <main className="flex h-[480px] w-[360px] flex-col gap-4 bg-background p-4 text-foreground">
      <Outlet />
      {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
    </main>
  );
}
