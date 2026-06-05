/** biome-ignore-all lint/style/noNestedTernary: ignore */
import { buttonVariants } from "@ext-stack/ui/components/button";
import { Link } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "./user-button";

export const Header = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
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
          {isPending ? null : session ? (
            <UserButton user={session.user} />
          ) : (
            <Link
              activeProps={{
                className: buttonVariants({ variant: "secondary" }),
              }}
              className={buttonVariants({ variant: "ghost" })}
              to="/sign-in"
            >
              Sign in
            </Link>
          )}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};
