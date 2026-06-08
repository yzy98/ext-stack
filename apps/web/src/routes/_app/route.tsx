import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/header";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </>
  );
}
