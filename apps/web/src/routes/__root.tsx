import { buttonVariants } from "@ext-stack/ui/components/button";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ModeToggle } from "@/components/mode-toggle";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-background/95">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-lg">ExtStack</p>
            <p className="text-muted-foreground text-sm">
              AI extension SaaS starter
            </p>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              activeProps={{
                className: buttonVariants({ variant: "secondary" }),
              }}
              className={buttonVariants({ variant: "ghost" })}
              to="/"
            >
              Home
            </Link>
            <Link
              activeProps={{
                className: buttonVariants({ variant: "secondary" }),
              }}
              className={buttonVariants({ variant: "ghost" })}
              to="/dashboard"
            >
              Dashboard
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <Outlet />
      </main>

      {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
    </div>
  );
}
