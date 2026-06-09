import { buttonVariants } from "@ext-stack/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const webUrl = import.meta.env.WXT_WEB_URL ?? "http://localhost:5173";

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <div className="space-y-1">
        <h1 className="font-semibold text-base">Sign in to ExtStack</h1>
        <p className="text-muted-foreground text-sm">
          Continue in the web app, then reopen the extension.
        </p>
      </div>

      <a
        className={buttonVariants({ className: "w-full" })}
        href={`${webUrl}/sign-in`}
        rel="noreferrer"
        target="_blank"
      >
        Open sign in
      </a>
    </div>
  );
}
