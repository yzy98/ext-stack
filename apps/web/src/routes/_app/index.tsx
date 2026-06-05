import { buttonVariants } from "@ext-stack/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Boxes, Gauge, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
});

const features = [
  {
    title: "Extension-first",
    description: "Start with a browser extension and grow into a SaaS product.",
    icon: Bot,
  },
  {
    title: "Typed API",
    description: "Share Hono RPC contracts across the web app and extension.",
    icon: ShieldCheck,
  },
  {
    title: "Shared UI",
    description: "Reuse shadcn components from one workspace package.",
    icon: Boxes,
  },
  {
    title: "Fast feedback",
    description:
      "Keep local checks, builds, and package boundaries predictable.",
    icon: Gauge,
  },
];

function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="grid min-h-[520px] items-center gap-10 py-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="flex max-w-2xl flex-col gap-6">
          <div className="inline-flex w-fit items-center rounded-md border bg-card px-3 py-1 font-medium text-muted-foreground text-sm">
            WXT, Hono, React, and shared TypeScript packages
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-5xl leading-tight tracking-normal">
              Build AI browser extension products without splitting the stack.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground leading-8">
              ExtStack gives you a typed web dashboard, Cloudflare Worker API,
              shared UI package, and a clear path toward auth, billing, AI
              usage, and extension publishing.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className={buttonVariants({
                className: "h-11 px-4",
              })}
              to="/dashboard"
            >
              Open dashboard
            </Link>
            <a
              className={buttonVariants({
                className: "h-11 px-4",
                variant: "outline",
              })}
              href="#foundation"
            >
              View foundation
            </a>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium">Workspace</p>
              <p className="text-muted-foreground text-sm">Monorepo modules</p>
            </div>
            <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-600 text-xs dark:text-emerald-400">
              active
            </span>
          </div>
          <div className="grid gap-3 pt-4">
            {[
              ["apps/web", "Vite dashboard"],
              ["apps/server", "Hono Worker API"],
              ["packages/ui", "Shared shadcn primitives"],
              ["packages/api", "Typed Hono RPC client"],
            ].map(([name, description]) => (
              <div
                className="flex items-center justify-between rounded-md border bg-background px-4 py-3"
                key={name}
              >
                <div>
                  <p className="font-medium text-sm">{name}</p>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
                <span className="size-2 rounded-full bg-primary" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        id="foundation"
      >
        {features.map((feature) => (
          <div
            className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
            key={feature.title}
          >
            <feature.icon className="mb-4 size-5 text-muted-foreground" />
            <h2 className="font-medium">{feature.title}</h2>
            <p className="mt-2 text-muted-foreground text-sm leading-6">
              {feature.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
