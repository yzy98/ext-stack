import { buttonVariants } from "@ext-stack/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <h1 className="font-semibold text-3xl">ExtStack</h1>
      <p className="text-muted-foreground">
        Build AI-powered browser extension products with a shared SaaS backend.
      </p>
      <Link className={buttonVariants()} to="/dashboard">
        Open dashboard
      </Link>
    </div>
  );
}
